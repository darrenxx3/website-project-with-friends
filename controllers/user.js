const passport = require('passport');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const normalizeEmail = require('normalize-email');
const slug = require('slug');
const Users = require("../models/Users");

const insertUser = async (req, res) => {
    const {username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const normalEmail = normalizeEmail(email);
    const slugUsername = slug(username);

    if(!isEmail(email)){
        res.status(422).json({error: "please correct your email format"});
        return;
    }  

    // const isExist = await Users.find({$or:[{username: slugUsername}, {email: normalEmail}]}) 
    // if(!isExist){
    //     console.log(isExist);
    //     res.status(409).json({error: "User already exist"})
    //     return;
    // }

    const user = new Users({
        username: slugUsername,
        email: normalEmail,
        password: hashedPass
    })

    user.save((err, user) => {
        if(err) console.log(err);

        req.login(user, (logErr) => {
            if(logErr) return console.log(logErr);
            console.log(req);
            return res.status(200).json({redirect :'/admin'});
        })
    })    
}

const findUsers = async (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json({users});
    })
    .catch(err => {
        res.status(500).json({error: err.message});
    });
    console.log(req.user);
}

const authLogin = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) return res.status(400).json({ errors: err });
        if(!user) return res.status(400).json({ erros: "No user found" });
        
        req.logIn(user, (err) => {
            if(err) return res.status(400).json({ errors: err });
            console.log(req.session);
            res.json({redirect: '/admin'});
        })
    }) (req, res, next);
}

const getLink = (req, res) => {
    const { username } = req.params;
    
    Users.findOne({ "username": username }, (err, docs) => {
        if(err){
            console.log(err);
            res.render('404');
            return;
        }
        
        res.render('linkUser', {user: docs})
    })
}

module.exports = {
    insertUser,
    findUsers,
    authLogin,
    getLink
}