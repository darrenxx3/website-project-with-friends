const { loadAdmin, loadEdit, loadProfile} = require('../controllers/admin');
const { getLink } = require('../controllers/user');
const express = require("express");
const router = express.Router({mergeParams: true});

router.route('/link/:username')
    .get(getLink);

router.route('/admin')
    .get(loadAdmin)

router.route('/admin/edit/:id')
    .get(loadEdit)

router.route('/admin/profile')
    .get(loadProfile)

module.exports = router;