const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const parseTemplate = require("./main");
const OTPparseTemplate = require("./OTP/OTP");
const path = require("path");
const user = require("./models/userModel");
// this is for the pdf dependencies
const fileupload = require("express-fileupload");
const userRouter = require("./router/fileRouter");
const diseaseModel = require("./models/Disease");

const app = express();
const PORT = 8080;

app.use(fileupload());
app.use(cors({ origin: "*" }));
app.use(express.json());

// router
app.use("/uploadFile", userRouter);

// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// find disease_name

app.post("/send", async (req, res) => {
  // console.log(req.body);

  const { name, email } = req.body;
  if (!name || !email) {
    res.status(401).json({
      message: "something is missing",
      success: false,
    });
  } else {
    const user = {
      email: req.body.email,
      date: new Date(Date.now()).toLocaleString(),
    };

    const OTP = Math.floor(100000 + Math.random() * 900000);
    // console.log(OTP);

    const emailTemplate = await parseTemplate(
      path.join(__dirname, "./index.html"),
      {
        name: name,
        email: email,
        OTP: OTP,
        visitedate: user.date,
      }
    );

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "tpamanagement2024@gmail.com",
        pass: "llce icse zgzd ppxh",
      },
    });

    // eyay qzpg cage fvtc

    await transporter.sendMail(
      {
        from: "tpamanagement2024@gmail.com",
        to: email,
        subject: "This email for logged in our websites",
        html: emailTemplate,
      },
      (error, result) => {
        if (error) {
          res.status(500).json({
            code: 500,
            message: "Email Could not be sent",
            messageID: "",
            status: false,
            error: error,
            data: [],
          });
        } else {
          console.log("send");
          res.status(200).json({
            code: 200,
            OTP: OTP,
            message: "Email is Send",
            messageID: result.messageId,
            status: true,
            error: [],
            data: [],
          });
        }
      }
    );
  }
});

// save user data

app.post("/user", async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "1234567890";
  const allChars = chars + nums;
  let reference = "";
  for (let i = 0; i < 8; i++) {
    reference += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  const userExist = await user.findOne({ email: email });
  try {
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user exist ",
      });
    }

    const newUser = await new user({ name, email, password, reference });

    newUser.save();
    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// findUser
app.post("/findUser", async (req, res) => {
  const email = req.body.token;
  const User = await user.findOne({ email: email }).populate("disease_details");
  if (User) {
    res.status(201).json({
      success: true,
      data: User,
    });
  }
});
// login h
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "something is missing",
    });
  } else {
    const existUser = await user.findOne({ email: email });
    if (existUser) {
      if (existUser.password === password) {
        return res.status(200).json({
          success: true,
          message: "login successfully",
          tocken: `${email}`,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "wrong password",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "email not found",
      });
    }
  }
});

// get the user details
app.get("/get", async (req, res) => {
  try {
    const users = await user.find({}).populate("disease_details"); // Fetch all users

    if (users.length > 0) {
      // Check if users exist
      return res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// client

app.post("/client/:email", async (req, res) => {
  // console.log(req.body);
  try {
    const userEmail = req.params.email;
    const User = await user.findOne({ email: userEmail });

    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobileNo",
      "address",
      "currentAddress",
      "city",
      "pinCode",
      "state",
      "aadharNo",
      "panCardNo",
      "bankName",
      "branchName",
      "Accoutno",
      "ifscCode",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
    }

    // Extract client data
    const client_data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      address: req.body.address,
      currentAddress: req.body.currentAddress,
      city: req.body.city,
      pinCode: req.body.pinCode,
      state: req.body.state,
      aadharNo: req.body.aadharNo,
      panCardNo: req.body.panCardNo,
      bankName: req.body.bankName,
      branchName: req.body.branchName,
      Accoutno: req.body.accountNo,
      ifscCode: req.body.ifscCode,
      status: true,
    };

    // Update user data
    let updatedUser = await user.findByIdAndUpdate(
      User._id,
      { Client_details: client_data },
      { new: true }
    );

    // send otp

    // return
    if (updatedUser) {
      const date = new Date(Date.now()).toLocaleString();
      const emailTemplate = await OTPparseTemplate(
        path.join(__dirname, "./OTP/client.html"),
        {
          name: client_data.firstName,
          email: client_data.email,
          visitedate: date,
          reference: updatedUser.reference,
        }
      );
      const transporter = await nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "tpamanagement2024@gmail.com",
          pass: "llce icse zgzd ppxh",
        },
      });
      await transporter.sendMail(
        {
          from: "tpamanagement2024@gmail.com",
          to: client_data.email,
          subject: "This email for logged in our websites",
          html: emailTemplate,
        },
        (error, result) => {
          if (error) {
            res.status(500).json({
              code: 500,
              message: "Email Could not be sent",
              messageID: "",
              status: false,
              error: error,
              data: [],
            });
          } else {
            console.log("send");
            res.status(200).json({
              code: 200,
              OTP: OTP,
              message: "Email is Send",
              messageID: result.messageId,
              status: true,
              error: [],
              data: [],
            });
          }
        }
      );
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
});
// claim here
app.post("/claim/:email", async (req, res) => {
  // console.log(req.body);
  try {
    const userEmail = req.params.email;
    const User = await user.findOne({ email: userEmail });
    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const requiredFields = [
      "name",
      "cardId",
      "policyNumber",
      "insuranceCompany",
      "hospitalName",
      "providerName",
      "address",
      "claimAmount",
      "bankName",
      "bankAccountNumber",
      "ifscCode",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(401).json({
        success: false,
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
    }
    const claim_data = {
      name: req.body.name,
      cardId: req.body.cardId,
      policyNumber: req.body.policyNumber,
      insuranceCompany: req.body.insuranceCompany,
      hospitalName: req.body.hospitalName,
      providerName: req.body.providerName,
      claimAmount: req.body.claimAmount,
      bankName: req.body.bankName,
      address: req.body.address,
      bankAccountNumber: req.body.bankAccountNumber,
      ifscCode: req.body.ifscCode,
      status: true,
    };
    const updatedUser = await user.findByIdAndUpdate(
      User._id,
      { Claim_details: claim_data },
      { new: true }
    );
    if (updatedUser) {
      const date = new Date(Date.now()).toLocaleString();
      const emailTemplate = await OTPparseTemplate(
        path.join(__dirname, "./OTP/Claim.html"),
        {
          name: claim_data.name,
          email: User?.Client_details?.email,
          visitedate: date,
          reference: updatedUser.reference,
        }
      );
      const transporter = await nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "tpamanagement2024@gmail.com",
          pass: "llce icse zgzd ppxh",
        },
      });
      await transporter.sendMail(
        {
          from: "tpamanagement2024@gmail.com",
          to: User?.Client_details?.email,
          subject: "This email for logged in our websites",
          html: emailTemplate,
        },
        (error, result) => {
          if (error) {
            res.status(500).json({
              code: 500,
              message: "Email Could not be sent",
              messageID: "",
              status: false,
              error: error,
              data: [],
            });
          } else {
            console.log("send");
            res.status(200).json({
              code: 200,
              OTP: OTP,
              message: "Email is Send",
              messageID: result.messageId,
              status: true,
              error: [],
              data: [],
            });
          }
        }
      );
      return res.status(200).json({
        success: true,
        message: "Claimed successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Claimed user",
      error: error.message,
    });
  }
});

// delete Claim
app.delete("/deleteClaim/:email", async (req, res) => {
  // console.log(req.body);
  try {
    const userEmail = req.params.email;
    const User = await user.findOne({ email: userEmail });
    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const claim_data = {
      name: "",
      cardId: "",
      policyNumber: "",
      insuranceCompany: "",
      hospitalName: "",
      providerName: "",
      claimAmount: "",
      bankName: "",
      address: "",
      bankAccountNumber: "",
      ifscCode: "",
    };
    await user.findByIdAndUpdate(
      User._id,
      { Claim_details: claim_data },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Claim deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
});
// Delete Account
app.delete("/deleteAccount/:email", async (req, res) => {
  // console.log(req.body);
  try {
    const userEmail = req.params.email;
    const User = await user.findOne({ email: userEmail });
    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const deletUser = await user.findOneAndDelete({ email: userEmail });
    if (deletUser) {
      return res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Account can not deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete Account",
      error: error.message,
    });
  }
});

// sendresponse
app.post("/sendresponse/:email", async (req, res) => {
  const { email } = req.params;
  const { input, status } = req.body;
  const notification = input.notification;
  const comments = input.comment;
  if (email) {
    const User = await user.findOne({ email });
    if (User) {
      await user.findByIdAndUpdate(
        User._id,
        {
          "Claim_details.status": status,
          "Claim_details.comments": comments,
          "Claim_details.notification": notification,
        },
        { new: true }
      );
      const diseaseUser = await await diseaseModel.findOneAndUpdate(
        { email },
        { Status: false },
        { new: true }
      );
      return res.status(201).json({
        success: true,
        message: "user updated",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "server error",
    });
  }
});

// this is for the takin the pdf details

// const __dirnam = path.resolve();
// app.use(express.static(path.join()));
// app.use(express.static(path.join(__dirnam, "/client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirnam, "client", "dist", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  mongoose
    .connect(
      "mongodb+srv://tpamanagement:tpa_management@tpa.as7ui.mongodb.net/?retryWrites=true&w=majority&appName=TPA"
    )
    .then((res) => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.error("Connection error:", e);
    });
});

// "mongodb+srv://tpamanagement:tpa_management@tpa.as7ui.mongodb.net/?retryWrites=true&w=majority&appName=TPA
