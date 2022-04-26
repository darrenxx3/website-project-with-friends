const normalizeUrl = require('normalize-url');
const Links = require('../models/Links');
var ObjectId = require('mongoose').Types.ObjectId;

const loadAdmin = async (req, res) => {
    const { username } = req.user;

    Links.findOne({ "username": username }, (err, obj) => {
        if (err) {
            console.log(err);
            return;
        }

        const { username, Links } = obj;
        res.render('admin', { username: username, links: Links });
    })
}

const loadEdit = async (req, res) => {
    const { id } = req.params;
    const { username } = req.user;

    console.log(id);

    Links.findOne({
        "username": username
    },
        {
            Links: {
                $elemMatch: {
                    "_id": ObjectId(id)
                }
            }
        },
        (err, obj) => {
            if (err) console.log(err);

            res.render('adminEdit', { id: id, link: obj.Links[0] });
        }
    )

}

const uploadData = async (req, res) => {
    const { id } = req.user;
    const { title, url, price, currency } = req.body

    const link = {
        Title: title,
        URL: normalizeUrl(url),
        Image: '/images/' + req.file.filename,
        Price: {
            Currency: currency,
            Value: price
        }
    }

    const UpLink = await Links.findOneAndUpdate({
        userID: id
    },
        {
            $push: {
                Links: link
            }
        }
    )

    res.redirect('/admin');
}

const updateData = async (req, res) => {
    const { id } = req.params;
    const { username } = req.user;
    const { title, url, price, currency } = req.body;

    console.log(req.params);
    const updatedData = {
        "Links.$.Title": title,
        "Links.$.URL": normalizeUrl(url),
        "Links.$.Image": '/images/' + req.file.filename,
        "Links.$.Price": {
            "Price.$.Currency": currency,
            "Price.$.Value": price
        }
    }

    await Links.updateOne({ 'username': username, 'Links._id': ObjectId(id) },
        {
            '$set':
            {
                "Links.$.Title": title,
                "Links.$.URL": normalizeUrl(url),
                "Links.$.Image": '/images/' + req.file.filename,
            }
        }
    ).then((err) => {
        console.log(err);
    })

    res.redirect('/admin')
}

const deleteData = async (req, res) => {
    const { id } = req.params;
    const { username } = req.user;

    console.log(id);
    Links.updateOne({ 'username': username },
        {
            "$pull": {
                "Links": { "_id": ObjectId(id) }
            }
        },
        {
            safe: true,
            multi: true
        },
        (err, obj) => {
            if(err) console.log(err);

            console.log(obj);
            res.redirect('/admin');
        }
    )
}

module.exports = {
    loadAdmin,
    uploadData,
    loadEdit,
    updateData,
    deleteData
}