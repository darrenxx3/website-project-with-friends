const { loadAdmin, loadEdit, loadProfile} = require('../controllers/admin');
const express = require("express");
const router = express.Router({mergeParams: true});

router.route('/admin')
    .get(loadAdmin)

router.route('/admin/edit/:id')
    .get(loadEdit)

router.route('/admin/profile')
    .get(loadProfile)

module.exports = router;