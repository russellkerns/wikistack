const express = require("express");
const router = express.Router();
const { addPage } = require("../views");

router.get("/", (req, res, next) => {
  try {
    res.send("//");
  } catch (err) {
    console.log("error");
  }
});

router.post("/", (req, res, next) => {
  try {
    res.json(req.body);
  } catch (err) {
    console.log("error");
  }
});

router.get("/add", (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    console.log("error");
  }
});

module.exports = router;
