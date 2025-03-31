const mongoose = require("mongoose");

const Con = new mongoose.Schema({
  mobile: Number,
});

module.exports = mongoose.model("Con", Con);
