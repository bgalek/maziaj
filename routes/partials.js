var express = require('express'),
    router = express.Router();

router.get('/gallery', function (req, res) {
    res.render('partials/gallery', { title: 'Galeria', subtitle: 'zwariowane sznurki' });
});

router.get('/chain', function (req, res) {
    res.render('partials/chain', { title: 'Szczegóły', subtitle: 'sznurka', user: req.user });
});

router.get('/play', function (req, res) {
    res.render('partials/play', { title: 'Graj', subtitle: 'czas na grę', user: req.user });
});

router.get('/profile', function (req, res) {
    res.render('partials/profile', { title: 'Twój profil', subtitle: 'tylko twój', user: req.user });
});

module.exports = router;