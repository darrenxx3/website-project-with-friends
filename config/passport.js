const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        Users.findOne({ email: email })
            .then(user => {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: user.password });
                    }
                })
            })
            .catch(err => {
                return done(null, false, { message: err })
            })
    })
)

module.exports = passport;