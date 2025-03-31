const mongoose = require("mongoose");

const Client = new mongoose.Schema({
  name: String,
  email: String,
  details: {
    type: mongoose.Schema.ObjectId,
    ref: "Con",
  },
});

module.exports = mongoose.model("Client", Client);
