const { insertUser, findUsers, authLogin } = require('../controllers/user');
const { uploadData, updateData, deleteData }  = require("../controllers/admin");
const express = require("express");
const router = express.Router({mergeParams: true});
// const upload = require('../middlewares/multerUpload');
const isLogged = require('../middlewares/isLogged');

//multer
const multer = require('multer');

//set up multer
const Storage = multer.diskStorage({
    destination: "uploads",
    limits: { fieldSize: 10 * 1024 * 1024 },
    filename: (req, file, cb) => {
        cb(null, `${req.user.username}-${Date.now()}.png`);
    }
})

const upload = multer({
    storage: Storage
})

router.route('/login')
    .post(authLogin);

router.route('/signup')
    .post(insertUser);

router.route('/upload')
    .post(upload.single("image"), uploadData);

router.route('/update/:id')
    .post(upload.single("image"), updateData);

router.route('/delete/:id')
    .post(deleteData);

router.route('/logout')
    .get((req, res) => {
        console.log(req.user);
        req.logOut();
        res.redirect('/login');
    })

module.exports = router;