const express = require('express');
const path = require("path");
const app = express();
const connectDB = require('./config/db');
const home = require('./routes/main');


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")));
app.use('/', home);

app.get('/', (req, res) => {
    res.render("index")
});

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