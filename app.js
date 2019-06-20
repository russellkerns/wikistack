const morgan = require("morgan");
const express = require("express");
const htmlTag = require("html-template-tag");
const app = express();
const models = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

// const { db } = require("./models");
// db.authenticate().then(() => {
//   console.log("connected to the database");
// });

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.use("/wiki", wikiRouter);
app.use("/user", userRouter);

app.get("/", (req, res, next) => {
  try {
    res.redirect("/wiki");
  } catch (err) {
    res.status(404);
  }
});

const init = async () => {
  // await models.User.sync()
  // await models.Page.sync();
  await models.db.sync({
    /*force: true*/
  });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();

const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
