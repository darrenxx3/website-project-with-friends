const Links = require('../models/Links')
const fs = require('fs');
const path = require("path");

const uploadData = async (req, res) => {
    console.log(req.user);
    // const { id } = req.user

    const { title, URL, price } = req.body

    const link = {
        Title: title,
        URL: URL,
        Image: {
            data: fs.readFile(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: 'image/png'
        },
        Price: price
    }

    Links.findOneAndUpdate({
        userID: id
    },
        {
            $push: {
                Links: link
            }
        })
    res.json({ MASUK })
    // res.redirect('/admin')
}

module.exports = {
    uploadData
}