require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then((res) => {
    console.log("data succesfully connect!");
  })
  .catch((e) => {
    console.log("data connect failed", e);
  });
