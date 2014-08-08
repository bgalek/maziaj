var express = require('express'),
    router = express.Router(),
    passport = require('passport');

/* NATIVE LOGIN */
router.post('/', passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login' }));

/* FACEBOOK */
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }));

/* GOOGLE */
router.get('/auth/google', passport.authenticate('google'));

router.get('/auth/google/return',
    passport.authenticate('oauth2', { successRedirect: '/',
        failureRedirect: '/login' }));

module.exports = router;