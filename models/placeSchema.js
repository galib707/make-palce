const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const placeModel = mongoose.model("Place", placeSchema);
module.exports = placeModel;
