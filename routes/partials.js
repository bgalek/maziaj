var express = require('express');
var router = express.Router();

router.get('/gallery', function (req, res) {
    res.render('partials/gallery', { title: 'Gallery' });
});

module.exports = router;