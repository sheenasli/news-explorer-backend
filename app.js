const express = require("express");
const mongoose = require("mongoose");

const {PORT = 3000} = process.env;
const app = express();

mongoose.set("strictQuery", true);
mongoose.connect('mongodb://127.0.0.1:27017/news_explorer_db', (r) => {
  console.log("connected to DB")}, e => console.log("DB connection error",e));

const routes = require('./routes')
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});