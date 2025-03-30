const mongoose = require("mongoose")


const PasswordResetShema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    token : {
        type: String
    }
})

const PasswordReset = mongoose.model("PasswordReset", PasswordResetShema)
module.exports = PasswordReset;