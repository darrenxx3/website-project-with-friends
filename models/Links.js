const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    userID : {
        type: String,
        trim: true
    },
    username : {
        type: String,
        trim: true
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
                data: Buffer,
                contentType: String
            },
            Price : {
                type: Number
            }
        }
    ]
})

const Links = mongoose.model("Link", LinkSchema);
module.exports = Links