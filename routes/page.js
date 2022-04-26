const { loadAdmin, loadEdit, updateData } = require('../controllers/admin');
const express = require("express");
const router = express.Router({mergeParams: true});

router.route('/admin')
    .get(loadAdmin)

router.route('/admin/:id')
    .get(loadEdit)

module.exports = router;