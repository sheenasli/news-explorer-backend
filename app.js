const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const { PORT = 3001 } = process.env;

const app = express();
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb://127.0.0.1:27017/news_explorer_db",
  (r) => {
    console.log("connected to DB");
  },
  (e) => console.log("DB connection error", e)
);

const routes = require("./routes");
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
