const { findUsername } = require('../controllers/main');
const express = require("express");
const router = express.Router();

router.route('/masuk').get(findUsername);

module.exports = router;
