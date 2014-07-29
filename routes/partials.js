var express = require('express');
var router = express.Router();

router.get('/gallery', function (req, res) {
    res.render('partials/gallery', { title: 'Gallery' });
});

router.get('/chain', function (req, res) {
    res.render('partials/chain', { title: 'Detail' });
});

module.exports = router;