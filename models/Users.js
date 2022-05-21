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
    description:{
        type: String,
        trim: true
    },
    securityQuestion: {
        question: {type: String, required: true},
        answer: {type: String, required: true}
    },
    image:{
        type: String
    },
    instagram:{
        type: String
    },
    tiktok: {
        type: String
    },
    Links : [
        {
            Title: {
                type: String, max: 100, required: true                    
            },
            URL : {
                type: String, required: true
            },
            Image : {
                type: String, required: true
            },
            Price : {
                Currency : {type: String, required: true},
                Value: {type: Number, required: true},
            }
        }
    ]

})

const Users = mongoose.model("User", userSchema);
module.exports = Users;