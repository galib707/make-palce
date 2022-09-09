const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const placeRouter = require("./route/place");

const DB_URL =
  "mongodb+srv://123:123@cluster0.icssrmw.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
    useNewURLParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
app.use(morgan("dev"));

app.use("/place", placeRouter);

app.listen(process.env.PORT || 8000);
