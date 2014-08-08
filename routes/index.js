var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Maziaj', user: req.user});
});

/* LOGIN */
router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
});

/* LOGOUT */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
