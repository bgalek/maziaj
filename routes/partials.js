var express = require('express');
var router = express.Router();

router.get('/gallery', function (req, res) {
    res.render('partials/gallery', { title: 'Galeria', subtitle: 'zwariowane sznurki' });
});

router.get('/chain', function (req, res) {
    res.render('partials/chain', { title: 'Szczegóły', subtitle: 'sznurka' });
});

router.get('/play', function (req, res) {
    res.render('partials/play', { title: 'Graj', subtitle: 'czas na grę' });
});

module.exports = router;