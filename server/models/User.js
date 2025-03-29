const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
    },
    last_name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phone_number : {
        type: Number,
        required : true,
        unique: true
    },
    isverified : {
        type: Boolean,
        default: false,
    },
    password : {
        type : String,
        required : true,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;