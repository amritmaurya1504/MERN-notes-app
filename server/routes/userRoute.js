const express = require("express");
const { registerUser , loginUser } = require("../controllers/userControllers.js");
const router = express.Router();



router.route("/").post(registerUser);
router.route("/login").post(loginUser);




module.exports = router;