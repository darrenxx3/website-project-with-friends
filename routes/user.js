const {insertUser, findUsers, authLogin} = require('../controllers/user');
const express = require("express");
const router = express.Router();

router.route('/users').get(findUsers);
router.route('/register').post(insertUser)
router.route('/login').post(authLogin);

module.exports = router;