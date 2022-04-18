const {insertUser, findUsers, authLogin} = require('../controllers/user');
const {uploadData} = require('../controllers/admin')
const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multerUpload');


router.route('/users').get(findUsers);
router.route('/register').post(insertUser)
router.route('/login').post(authLogin);
router.route('/upload').post(upload.single("image"), uploadData);

module.exports = router;