const pdfParse = require("pdf-parse");
const diseaseModel = require("../models/Disease"); // Renamed for clarity
const user = require("../models/userModel");
const disease_names = require("../models/disease_names");
const OTPparseTemplate = require("../OTP/OTP");
const path = require("path");
const nodemailer = require("nodemailer");

const fileHandler = async (req, res) => {
  const email = req.params.email;

  if (!req.files || !req.files.pdfFile) {
    return res.status(400).json({
      success: false,
      message: "No PDF file found",
    });
  }

  try {
    const pdfData = await pdfParse(req.files.pdfFile);
    const description = pdfData.text; // Fixed typo

    const conditionMatch = description.match(/Recently I had a\s+([\w\s]+)/);
    const extractedDiseaseName = conditionMatch
      ? conditionMatch[1].trim()
      : "Not Found";
    const billMatch = description.match(
      /The total bill came out to be\s+(\d+)/
    );
    const billAmount = billMatch ? billMatch[1] : "Not Found";

    // Validate extracted data
    if (
      extractedDiseaseName === "Not Found" ||
      billAmount === "Not Found" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Uploaded PDF is not valid",
      });
    }

    const havingDetails = await diseaseModel.findOne({ email: email });

    // console.log(havingDetails);
    if (!havingDetails) {
      const details = await diseaseModel.create({
        email: email,
        disease_name: extractedDiseaseName,
        billAmmount: billAmount,
        discription: description,
        status: true,
      });

      const User = await user.findOneAndUpdate(
        { email: email },
        { disease_details: details._id },
        { new: true }
      );
      console.log(User);

      return res.json({
        success: true,
        message: "pdf uploaded successfully",
        details,
      });
    }
    // Save to database
    const details = await diseaseModel.findByIdAndUpdate(
      havingDetails._id,
      {
        disease_name: extractedDiseaseName,
        billAmmount: billAmount,
        discription: description,
        status: true,
      },
      { new: true }
    );
    if (details) {
      const User = await user.findOne({ email });
      const date = new Date(Date.now()).toLocaleString();
      const emailTemplate = await OTPparseTemplate(
        path.join(__dirname, "../OTP/Report.html"),
        {
          name: User?.Client_details?.firstName,
          email: User?.Client_details?.email,
          visitedate: date,
          Reference: User?.reference,
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
      res.json({
        success: true,
        message: "pdf updated successfully",
        details,
      });
    }
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({
      success: false,
      message: "Error processing PDF",
    });
  }
};

const varified = async (req, res) => {
  try {
    const email = req.params.email;
    const userRecord = await user
      .findOne({ email })
      .populate("disease_details", "-description");

    if (!userRecord) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { Claim_details, Client_details } = userRecord;
    if (!Claim_details || !Client_details) {
      return res.status(400).json({
        success: false,
        message: "User details are incomplete",
      });
    }

    const fullName = `${Client_details.firstName}${Client_details.lastName}`;
    const claimantName = Claim_details.name.replace(/\s+/g, "");

    let diseaseDetails = await diseaseModel.findOne({ email });
    const diseaseName = diseaseDetails.disease_name;

    if (!diseaseDetails) {
      diseaseDetails = new diseaseModel({ email, issues: [] });
    }

    let issuesToAdd = [];

    if (Claim_details.status) {
      const findAndVarifyName = await disease_names.findOne({
        disease_name: diseaseName,
      });
      const [min, max] = findAndVarifyName.price.split("-").map(Number);

      if (fullName !== claimantName) {
        issuesToAdd.push("Name does not match");
      }
      if (Claim_details.ifscCode !== Client_details.ifscCode) {
        issuesToAdd.push("IFSC code does not match");
      }
      if (Claim_details.bankName !== Client_details.bankName) {
        issuesToAdd.push("Bank name does not match");
      }
      if (Claim_details.claimAmount !== diseaseDetails?.billAmmount) {
        issuesToAdd.push("Claim amount does not match");
      }
      if (
        diseaseDetails?.billAmmount < min ||
        diseaseDetails?.billAmmount > max
      ) {
        issuesToAdd.push(
          "claim ammount,uploaded ammount and server ammount does not match"
        );
      }

      let updatedIssues = new Set([...diseaseDetails.issues, ...issuesToAdd]);

      // Remove resolved issues
      diseaseDetails.issues = [...updatedIssues].filter((issue) =>
        issuesToAdd.includes(issue)
      );

      await diseaseDetails.save();

      if (diseaseDetails.issues.length > 0) {
        await diseaseModel.findOneAndUpdate(
          { email },
          { Status: false },
          { new: true }
        );

        return res.status(400).json({
          success: false,
          message: "Some document details do not match",
          issues: diseaseDetails.issues,
        });
      } else {
        await diseaseModel.findOneAndUpdate(
          { email },
          { Status: true },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          message: "Document verified successfully",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please verify the document first",
      });
    }
  } catch (error) {
    console.error("Error in verification:", error);
    res.status(500).json({
      success: false,
      message: "Something is missing in your Document",
    });
  }
};

// const getAllNames = async (req, res) => {
//   const searchQuery = req.params.name; // Get search keyword from URL params

//   try {
//     const names = await disease_names.find({
//       disease_name: { $regex: searchQuery, $options: "i" }, // Case-insensitive & partial match
//     });

//     if (names.length > 0) {
//       return res.status(200).json({
//         success: true,
//         data: names,
//       });
//     }

//     return res.status(404).json({
//       success: false,
//       message: "No disease names found",
//     });
//   } catch (error) {
//     console.error("Error fetching names:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
const getAllNames = async (req, res) => {
  try {
    const data = await disease_names.find({});

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No disease names found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// This is for sending the refrence and their status

const reference = async (req, res) => {
  const { email, reference } = req.body;
  const User = await user.findOne({ reference }).populate("disease_details");
  if (!User) {
    return res.status(401).json({
      success: false,
      message: "invalid name or reference No",
    });
  }
  if (User) {
    if (email == User?.Client_details?.email) {
      const data = {
        name: User?.Claim_details?.name,
        reference: reference,
        email: User?.Client_details?.email,
        Claim_details: User?.Claim_details?.status,
        Claim_Ammount: User?.Claim_details?.claimAmount,
        Client_details: User?.Client_details?.status,
        uploadStatus: User?.disease_details?.status,
        addClaimStatus: User?.Claim_details?.addClaimStatus,
        ReportStatus: User?.disease_details?.Status,
        issues: User?.disease_details?.issues,
      };
      res.status(201).json({
        success: true,
        message: "successfully track",
        data,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid refrence or email",
      });
    }
  }
};

module.exports = { fileHandler, varified, getAllNames, reference };
