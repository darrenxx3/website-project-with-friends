const bcrypt = require('bcrypt');
const normalizeUrl = require('normalize-url');
const Users = require('../models/Users');
var ObjectId = require('mongoose').Types.ObjectId;

const loadAdmin = async (req, res) => {

    const { username } = req.user;

    var searchOption = {
        "username": username
    }

    if (req.query.title) {
        searchOption["Links.Title"] = { "$regex": req.query.title, "$options": "i" };
    }

    console.log(searchOption);

    Users.aggregate([
        { "$unwind": '$Links' },
        {
            "$match": {
                "$and": [
                    searchOption
                ]
            }
        },
        {
            "$project": {
                Links: 1
            }
        }]).exec((err, docs) => {
            if (err) {
                console.log(err);
                return;
            }

            //console.log(docs);
            let arrID = docs.map((arr, index) => {
                return arr.Links._id.valueOf();
            })

            let link = `localhost:3000/link/${username}`;

            res.render('admin', {userLink: docs, id: arrID, link:link})
        })
}

const loadEdit = async (req, res) => {
    const { id } = req.params;
    const { username } = req.user;

    console.log(id);

    Users.findOne({
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
    const { username } = req.user;
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

    const UpLink = await Users.findOneAndUpdate({
        "username": username
    },
        {
            $push: {
                Links: link
            }
        }
    )
    console.log(UpLink)

    res.sendStatus(200);
}

const updateData = async (req, res) => {
    const { id } = req.params;
    const { username } = req.user;
    const { title, url, price, currency } = req.body;

    const updatedData = {
        "Links.$.Title": title,
        "Links.$.URL": normalizeUrl(url),
        "Links.$.Price": {
            "Currency": currency,
            "Value": price
        }
    }

    if (req.file) Object.assign(updatedData, { 'Links.$.Image': '/images/' + req.file.filename });

    console.log(updatedData);
    await Users.updateOne({ 'username': username, 'Links._id': ObjectId(id) },
        {
            '$set': updatedData
        }
    ).then((err) => {
        if (err) console.log(err);

        res.sendStatus(200);
    })
}

const deleteData = async (req, res) => {
    const { id } = req.params;
    const { username } = req.user;

    console.log(id);
    Users.updateOne({ 'username': username },
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
            if (err) console.log(err);

            console.log(obj);
            res.redirect('/admin');
        }
    )
}

const loadProfile = async (req, res) => {
    const { username } = req.user;

    Users.findOne({ username: username },
        (err, obj) => {
            if (err) { res.status(404); return; }

            let link = `localhost:3000/link/${username}`;

            console.log(obj);
            res.render('adminProfile', { User: obj, link: link});
        })

}

const updateUser = async (req, res) => {
    const { username, password } = req.user;
    const { instagram, tiktok, description, curPassword, newPassword } = req.body;

    bcrypt.compare(curPassword, password, async (err, response) => {
        if (err || !response) {
            console.log("Salah password")
            res.sendStatus(402);
        } else {

            var updtUser = {
                instagram: instagram,
                tiktok: tiktok,
                description: description,
            };

            if (req.file) updtUser.image = '/images/' + req.file.filename;
            if (newPassword) updtUser.password = await bcrypt.hash(newPassword, 10);

            Users.updateOne({ 'username': username },
                {
                    $set: updtUser
                },
                (err, doc) => {
                    if (err) { console.log(err); res.sendStatus(404); return; };

                    console.log(doc);
                    res.sendStatus(200);
                }
            )
        }
    });

}

module.exports = {
    loadAdmin,
    uploadData,
    loadEdit,
    updateData,
    deleteData,
    loadProfile,
    updateUser,
};