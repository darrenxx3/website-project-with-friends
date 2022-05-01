const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String
    },
    instagram:{
        type: String
    },
    tiktok: {
        type: String
    }

})

const Users = mongoose.model("User", userSchema);
module.exports = Users;