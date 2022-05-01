const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const app = express();

const connectDB = require('./config/db');
const isLogged = require('./middlewares/isLogged')
const routeAPI= require('./routes/api');
const routePage = require('./routes/page');

const passport = require('./config/passport');
const session = require('express-session');
const MongoStore = require("connect-mongo");

app.use('/static', express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "uploads")))
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

//Load dynamic page
app.set("view engine", "ejs");

//Set up session
app.use(cookieParser());
app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URI
    }),
    secret: "anything",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());    
// app.use(function (req, res, next){
//     res.locals.currentUser = req.user;
//     console.log("Current Username:", res.locals.currentUser)
//     next();
// })

app.use('/admin/', isLogged);
app.use('/', routePage);
//User API
app.use(express.static(path.join(__dirname, "public/pages")));  
app.use('/api', routeAPI);

app.use((req, res) => {
    res.status(404).render('404');
})

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