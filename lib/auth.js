var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    app = require('../app');

if (app.env === 'production') {
    config = require('../config/prod.json');
} else {
    config = require('../config/dev.json');
}

passport.use(
    new FacebookStrategy({
            clientID: config.auth.facebook.APP_ID,
            clientSecret: config.auth.facebook.APP_SECRET,
            callbackURL: config.auth.facebook.CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
        }
    )
);

passport.use(new GoogleStrategy({
        returnURL: config.auth.google.CALLBACK_URL,
        realm: 'http://maziaj.pl/'
    },
    function (identifier, profile, done) {
        console.log(profile);
    }
));

passport.use(new LocalStrategy(
    function (username, password, done) {
        return done(null, {id: 1, username: username, email: username + "@" + password + ".com"});
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, {id: user.id, username: user.username, email: user.email});
});

exports.passport = passport;