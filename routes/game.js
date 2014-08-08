var express = require('express'),
    router = express.Router();

router.get('/canvas', function (req, res) {
    res.render('game/canvas');
});

router.get('/caption', function (req, res) {
    res.render('game/caption');
});

module.exports = router;