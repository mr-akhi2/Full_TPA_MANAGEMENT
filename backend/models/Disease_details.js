const mongoose = require("mongoose");

const disease_details = new mongoose.Schema({
  disease_name: String,
  bill_ammount: Number,
});
module.exports = mongoose.model("disease_details", disease_details);
