const passport = require('passport');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const normalizeEmail = require('normalize-email');
const slug = require('slug');
const Users = require("../models/Users");

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const insertUser = async (req, res) => {
    const {username, email, password, question, answer } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const hashedAns = await bcrypt.hash(answer, 10);
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
                    password: hashedPass,
                    securityQuestion: {
                        question: question,
                        answer: hashedAns
                    }
                })
            
                user.save((err, user) => {
                    if(err) console.log(err);
            
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
        if(err || !docs){
            res.render('404');
            return;
        }
        
        res.render('linkUserRev', {user: docs})
    })
}

const checkEmail = (req, res) => {
    const { email } = req.body

    Users.findOne({ "email": email }, 
    (err, docs) => {
        if(err || !docs){
            res.sendStatus(404);
            return;
        }
        const encryptEmail = cryptr.encrypt(docs.email);
        res.status(200).json({email: encryptEmail});
    })
}

const loadConfirm = async (req, res) => {
    const {encryptEmail} = req.params;
    const decryptEmail =  cryptr.decrypt(encryptEmail); 

    Users.findOne({ "email" : decryptEmail }, 
    (err, docs) => {
        if(err){
            res.render('404');
        }

        const {question} = docs.securityQuestion
        console.log(question);
        res.render("forgotConfirm", {question: question})
    })
}

const updatePass = async(req, res) => {
    const{encryptEmail} = req.params;
    const decryptEmail =  cryptr.decrypt(encryptEmail); 

    const { answer, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    Users.updateOne({
        "email" : decryptEmail,
        "securitQuestion.answer" : answer
    },
    {
        "password" : hashedPass
    },
    (err, docs) => {
        if(err) {
            console.log(err);
            res.sendStatus(403); 
            return;
        }

        res.sendStatus(200);
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
    deleteUser,
    checkEmail,
    loadConfirm,
    updatePass,
}