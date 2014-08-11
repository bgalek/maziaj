var express = require('express'),
    router = express.Router(),
    user = require('../lib/user');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Maziaj', user: req.user});
});

/* LOGIN */
router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
});

/* REGISTER */
router.get('/register', function (req, res) {
    res.render('register', { title: 'Rejestracja' });
});

router.post('/register', function (req, res) {
    user.register(req.body, function (error) {
        if (error) {
            res.redirect('/register');
        } else {
            res.redirect('/');
        }
    });
});

/* LOGOUT */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
