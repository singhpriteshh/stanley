const express = require("express")
const { registerUser, loginUser, logoutUser, authMiddleware, verifyEmail } = require("../../controller/auth/auth-controller")

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/mail-verification", verifyEmail);
router.post("/logout",logoutUser);
router.get("/check-auth", authMiddleware, (req, res)=> {
    const user =req.user;
    res.status(200).json({
        success : true,
        message: "Authenticated User",
        user,
    });
});

module.exports = router;