var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    OAuth2Strategy = require('passport-oauth2').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    app = require('../app');

passport.use(
    new FacebookStrategy({
            clientID: '730865793639949',
            clientSecret: process.env.FACEBOOK_APP_SECRET || 'DUMMY_APP_SECRET',
            callbackURL: 'http://maziaj.herokuapp.com/login/auth/facebook/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, {id: profile.id, username: profile.displayName, email: 'email@email.com'});
        }
    )
);

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
        tokenURL: 'https://accounts.google.com/o/oauth2/token',
        clientID: '662372396489-5jtc6km803bhrdienkp08s63as45hpa5.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_APP_SECRET',
        callbackURL: "http://maziaj.herokuapp.com/login/auth/google/return"
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, {id: profile.id, username: profile.displayName, email: 'email@email.com'});
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