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

    Users.find({ $or: [ {username: slugUsername}, {email: normalEmail} ]}, 
        (err, docs) => {
            if(docs.length){
                res.sendStatus(409)
            }else{

                const user = new Users({
                    username: slugUsername,
                    email: normalEmail,
                    password: hashedPass
                })
            
                user.save((err, user) => {
                    if(err) res.sendStatus(400);
            
                    req.login(user, (logErr) => {
                        if(logErr) return console.log(logErr);
                        console.log(req);
                        return res.sendStatus(200)
                    })
                })    
            }
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
            res.sendStatus(200);
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

const deleteUser = async (req, res) => {
    const {username} = req.user;    

    Users.deleteOne({username: username})
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(400);
    })
}

module.exports = {
    insertUser,
    findUsers,
    authLogin,
    getLink,
    deleteUser
}