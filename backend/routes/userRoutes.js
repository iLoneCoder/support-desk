const express = require("express");
const router = express.Router();

const userContoller = require("../controllers/userController");
const protect = require("../middlewares/protect");

router.post("/", userContoller.registerUser);

router.post("/login", userContoller.loginUser);

router.get("/me", protect, userContoller.getMe);

module.exports = router;
