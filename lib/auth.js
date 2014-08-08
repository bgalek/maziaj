var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    app = require('../app');

passport.use(
    new FacebookStrategy({
            clientID: '730865793639949',
            clientSecret: process.env.FACEBOOK_APP_SECRET || 'DUMMY_APP_SECRET',
            callbackURL: 'http://maziaj.herokuapp.com/auth/facebook/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
        }
    )
);

passport.use(new GoogleStrategy({
        returnURL: 'http://maziaj.herokuapp.com/auth/google/return',
        realm: 'http://maziaj.pl/'
    },
    function (identifier, profile, done) {
        console.log(profile);
    }
));

passport.use(new LocalStrategy(
    function (username, password, done) {
        return done(null, {id: 1, username: username, email: username + '@' + password + '.com'});
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, {id: user.id, username: user.username, email: user.email});
});

exports.passport = passport;