const mongoose = require("mongoose");

const disease_names = new mongoose.Schema({
  id: Number,
  disease_name: String,
  description: String,
  price: String,
});

module.exports = mongoose.model("disease_names", disease_names);
