const parseTemplate = require("./main1");
const path = require("path");
const nodemailer = require("nodemailer");

const sendresponse = async (req, res) => {
  // console.log(req.body);

  const { name, email, subject, text } = req.body;
  if (!name || !email || !subject || !text) {
    res.status(401).json({
      message: "All fieled is required",
      success: false,
    });
  } else {
    const user = {
      email: req.body.email,
      date: new Date(Date.now()).toLocaleString(),
    };

    const emailTemplate = await parseTemplate(
      path.join(__dirname, "./index.html"),
      {
        name: name,
        email: email,
        subject: subject,
        text: text,
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
        to: "tpamanagement2024@gmail.com",
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
            message: "Mail  Send to your email",
            messageID: result.messageId,
            status: true,
          });
        }
      }
    );
  }
};

module.exports = sendresponse;
