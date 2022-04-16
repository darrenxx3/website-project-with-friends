const asyncWrapper  = require('../middlewares/wrapper')
const passport = require('passport');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const normalizeEmail = require('normalize-email');
const slug = require('slug');
const Users = require("../models/Users");

const insertUser = asyncWrapper(async (req, res) => {
    const {username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const normalEmail = normalizeEmail(email);
    const slugUsername = slug(username);

    if(!isEmail(email)){
        res.status(422).json({error: "please correct your email format"});
        return;
    }  

    const user = new Users({
        username: slugUsername,
        email: normalEmail,
        password: hashedPass
    })
    user.save()
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
})

const findUsers = asyncWrapper(async (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json({users});
    })
    .catch(err => {
        res.status(500).json({error: err.message});
    })
})

const authLogin = asyncWrapper((req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) return res.status(400).json({ errors: err });
        if(!user) return res.status(400).json({ erros: "No user found" });
        
        req.logIn(user, (err) => {
            if(err) return res.status(400).json({ errors: err });
            
            //sucess
            res.status(200).json({ sucess: `logged in ${user.id} ` })
        })
    }) (req, res, next);
})

module.exports = {
    insertUser,
    findUsers,
    authLogin
}