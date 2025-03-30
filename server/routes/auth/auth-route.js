const express = require("express")
const { registerUser, loginUser, verifyEmail, forgetPassword, resetPassword } = require("../../controller/auth/auth-controller")

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/mail-verification", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;