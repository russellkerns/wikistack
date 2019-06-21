const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page, User } = require("../models");
const wikiPage = require("../views/wikipage");
const mainHTML = require("../views/main");

router.get("/", async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    //console.log('All pages from db:', allPages)
    res.send(mainHTML(allPages));
  } catch (err) {
    console.log("error");
  }
});

router.post("/", async (req, res, next) => {

  // const user = await User.findOrCreate(
  //   {where: {name:req.body.name}
  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email
  // });

  // const page = new Page({
  //   title: req.body.title,
  //   content: req.body.content,
  //   authorId: user.id
  // });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const [user, wasCreated]= await User.findOrCreate({
      where: { name: req.body.name, email: req.body.email }
    });
    const page = await Page.create(req.body);
    page.setAuthor(user);

    // await page.save();
    // if (author[1] !== false) {
    //   await user.save();
    // }

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
    const pageAuthor = await page.getAuthor()
    res.send(wikiPage(page, pageAuthor));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
