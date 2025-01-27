const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")




//register

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    console.log(req.body);


    try {

        const checkUser = await User.findOne({ email });
        if (checkUser) return res.json({
            success: false,
            message: "user is already exist with this email! please try to login"
        });

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        });


        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration Successful"
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });

    }
};


//Login

const loginUser = async (req, res) => {
    const { email, password } = req.body;


    try {

        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.json({
            success: false,
            message: "user not exist"
        })

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) return res.json({
            success: false,
            message: "Invalid Credentials"
        });

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' })

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in Successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })

    }
}


//logout

const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "LogOut Successfully"
    });
};


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    
    if (!token) return res.json({
        success: false,
        message: "Unauthorized user !"
    })

    try {


        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "some error occured",
        })

    }
}




module.exports = { registerUser, loginUser, logoutUser, authMiddleware }