const express = require("express");
const router = express.Router();
const placeModel = require("../models/placeSchema");

router.post("/makeplace", async (req, res) => {
  try {
    const { city, name, state } = req.body;
    let temp = [city, name, state];
    const newPlace = new placeModel({
      city,
      name,
      state,
      slug: slugify(temp.join(" ")),
    });
    await newPlace.save();
    res.status(200).send(newPlace);
  } catch (error) {
    res.status(400).send("read the docs");
  }
  //   res.send("make place reached");
});

router.get("/:slug", async (req, res) => {
  try {
    const places = await placeModel.find({ slug: req.params.slug });
    res.status(200).send(places);
  } catch (error) {
    res.status(400).send("read the docs");
  }
});

router.get("/", async (req, res) => {
  const name = req.query.name;
  const city = req.query.city;

  console.log("city", city, "name", name);
  try {
    const filter = {};

    if (name !== undefined) {
      filter.name = name;
    }
    if (city !== undefined) {
      filter.city = city;
    }

    console.log(filter);
    const places = await placeModel.find(filter);
    res.status(200).send(places);
  } catch (error) {
    res.status(400).send("read the docs");
  }
});

module.exports = router;

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
