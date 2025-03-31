const mongoose = require("mongoose");

let diseaseModel = new mongoose.Schema({
  email: String,
  disease_name: String,
  billAmmount: String,
  discription: String,
  Status: Boolean,
  issues: [{ type: String }],
});
module.exports = mongoose.model("diseaseModel", diseaseModel);
