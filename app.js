const morgan = require("morgan");
const express = require("express");
const htmlTag = require("html-template-tag");
const app = express();
// const { db } = require("./models");
// db.authenticate().then(() => {
//   console.log("connected to the database");
// });

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  try {
    res.send("hello world");
  } catch (err) {
    console.log("error");
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
