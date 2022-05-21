const { insertUser, findUsers, authLogin, deleteUser, checkEmail, updatePass } = require('../controllers/user');
const { uploadData, updateData, deleteData, updateUser }  = require("../controllers/admin");
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

router.route('/users')
    .get(findUsers);

router.route('/login')
    .post(authLogin);

router.route('/signup')
    .post(insertUser);

router.route('/forgotPass')
    .post(checkEmail);

router.route('/changePass/:encryptEmail')
    .post(updatePass)

router.route('/upload')
    .post(upload.single("image"), uploadData);

router.route('/update/:id')
    .post(upload.single("image"), updateData);

router.route('/delete/:id')
    .post(deleteData);

router.route('/profile')
    .post(upload.single("image"), updateUser);

router.route('/logout')
    .get((req, res) => {
        console.log(req);
        req.logOut();
        res.sendStatus(200);
    })

router.route('/deleteUser')
    .post(deleteUser)


module.exports = router;