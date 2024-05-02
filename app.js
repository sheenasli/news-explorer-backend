require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter } = require("./utils/limiter");
const { MONGO_DB_CONNECTION } = require("./utils/config");

const { PORT = 3001 } = process.env;

const app = express();
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect(
  MONGO_DB_CONNECTION,
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB connection error", e),
);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

const routes = require("./routes");

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
