var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    app = require('../app');

passport.use(
    new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID || 'DUMMY_APP_ID',
            clientSecret: process.env.FACEBOOK_APP_SECRET || 'DUMMY_APP_SECRET',
            callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'DUMMY_CALLBACK_URL'
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
        }
    )
);

passport.use(new GoogleStrategy({
        returnURL: process.env.GOOGLE_CALLBACK_URL || 'DUMMY_CALLBACK_URL',
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