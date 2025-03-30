const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring")
const User = require("../../models/User");
const PasswordReset = require("../../models/PasswordReset")
const sendMail = require("../../utils/mailfunction");

//register

const registerUser = async (req, res) => {
  const { first_name, last_name, phone_number, email, password, isVerified } =
    req.body;
  console.log("Request Body:", req.body);

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email! Please try to login.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      first_name,
      last_name,
      phone_number,
      email,
      isVerified,
      password: hashPassword,
    });

    await newUser.save();

    // Send verification email
    const mailSubject = "Verification Mail";
    const randomToken = jwt.sign({ email }, "CLIENT_SECRET_KEY", {
      expiresIn: "10m",
    });

    const content = `Hello ${first_name}, Please Click <a href="http://localhost:5173/auth/mail-verification?token=${randomToken}&phoneNumber=${phone_number}">Verify</a> to verify your email`;

    sendMail(email, mailSubject, content);

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (e) {
    console.error("Registration Error:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "user not exist",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    if (res.status(201)) {
      return res.json({
          success: true,
          token: token,
          message: "Logged In Successfully",
          user: {
              first_name: checkUser.first_name,
              last_name: checkUser.last_name,
              email:checkUser.email,
              phone_number: checkUser.phone_number,
              isverified: checkUser.isverified
          }
      });
  } else {
      return res.json({ error: "error" });
  }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//verify mail
const verifyEmail = async (req, res) => {
  const token = req.query.token;
 
  try {
    // Decode JWT
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    const email = decoded.email;

    // Find user by email and phone number
    const user = await User.findOne({ email });
    
    if (!user || user.isverified) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or already verified.",
      });
    }

    // Update isVerified field
    user.isverified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
      const { email } = req.body;
      if (!email) {
          return res.status(400).json({
              success: false,
              message: "Email is required",
          });
      }

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(401).json({
              success: false,
              message: "Invalid email, no user found",
          });
      }

      const token = randomstring.generate();

      // Delete any existing reset record
      await PasswordReset.deleteMany({ email });

      // Create a new reset record
      await PasswordReset.create({
          email,
          token,
      });

      const mailSubject = "Password reset";
      const content = `Hello ${user.first_name}, Please <a href="http://localhost:5173/auth/reset-password?token=${token}">Click Here</a> to reset your password`;

      sendMail(email, mailSubject, content);

      return res.status(200).json({
          success: true,
          message: "Mail sent successfully",
      });

  } catch (error) {
      console.error("Forget Password Error:", error);
      return res.status(500).json({
          success: false,
          message: "Something went wrong",
      });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
      const resetRecord = await PasswordReset.findOne({ token });

      if (!resetRecord) {
          return res.status(400).json({
              success: false,
              message: "Invalid token",
          });
      }

      const user = await User.findOne({ email: resetRecord.email });
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      await user.save();

      await PasswordReset.deleteOne({ email: resetRecord.email });

      return res.status(200).json({
          success: true,
          message: "Password reset successfully",
      });

  } catch (error) {
      console.error("Reset Password Error:", error);
      return res.status(500).json({
          success: false,
          message: "Failed to reset password. Please try again later.",
      });
  }
};


module.exports = { registerUser, loginUser, verifyEmail, forgetPassword, resetPassword };
