const express = require("express");
const router = express.Router();
const { addPage } = require("../views");

const { Page } = require("../models");
const wikiPage = require("../views/wikipage");

router.get("/", (req, res, next) => {
  try {
    res.send("//");
  } catch (err) {
    console.log("error");
  }
});

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    console.log("error");
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
