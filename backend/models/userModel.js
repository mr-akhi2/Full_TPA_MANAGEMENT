const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    reference: String,

    Claim_details: {
      name: String,
      cardId: String,
      policyNumber: String,
      insuranceCompany: String,
      hospitalName: String,
      providerName: String,
      address: String,
      claimAmount: String,
      bankName: String,
      bankAccountNumber: String,
      ifscCode: String,
      comments: String,
      notification: String,
      status: {
        type: Boolean,
      },
    },
    Client_details: {
      firstName: String,
      lastName: String,
      email: String,
      mobileNo: String,
      address: String,
      currentAddress: String,
      city: String,
      pinCode: String,
      state: String,
      aadharNo: String,
      panCardNo: String,
      bankName: String,
      branchName: String,
      Accoutno: String,
      ifscCode: String,
      status: {
        type: Boolean,
      },
    },
    disease_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diseaseModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
