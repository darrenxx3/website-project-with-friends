const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const connectDB = require('./config/db');
const userAPI = require('./routes/user')

const passport = require('./config/passport')
const MongoStore = require("connect-mongo");
const session = require('express-session');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

//Load dynamic page
app.set("view engine", "ejs");
//Load static page
app.use(express.static(path.join(__dirname, "public/pages")));
//Server static file
app.use('/static', express.static(path.join(__dirname, "public")));
//User API
app.use('/api', userAPI);
//Set up session
app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URI
    }),
    resave: false,
    saveUninitialized: true,
    secret: "very secret this is"
}));
app.use(passport.initialize());
app.use(passport.session());



const startServer = async () => {
    try{
        await connectDB();
        app.listen(3000, () => {
            console.log("Listening to the void....")
        })
    }
    catch (error){
        console.log("ERROR:", error);
    }
}

startServer();