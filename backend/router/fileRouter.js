const express = require("express");
const { fileHandler } = require("../controller/fileController");
const { varified, getAllNames } = require("../controller/fileController");
const sendresponse = require("../controller/sendResponse");
const router = express.Router();

router.route("/file/:email").post(fileHandler);
router.route("/varify/:email").post(varified);
router.route("/getallname").get(getAllNames);
router.route("/sendresponse").post(sendresponse);

module.exports = router;
