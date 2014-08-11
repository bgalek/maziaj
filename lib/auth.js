var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    OAuth2Strategy = require('passport-oauth2').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config/config.json'),
    user = require('./user');

passport.use(
    new FacebookStrategy({
            clientID: config.auth.facebook.clientID,
            clientSecret: process.env.FACEBOOK_APP_SECRET || 'DUMMY_APP_SECRET',
            callbackURL: config.auth.facebook.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            user.findOrCreate(profile, function (error, user) {
                if (error) {
                    return done(error);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect user;' });
                }
                return done(null, user);
            });
        }
    )
);

passport.use(new OAuth2Strategy({
        authorizationURL: config.auth.google.authorizationURL,
        tokenURL: config.auth.google.tokenURL,
        clientID: config.auth.google.clientID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_APP_SECRET',
        callbackURL: config.auth.google.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        user.findOrCreate(profile._json, function (error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect user;' });
            }
            return done(null, user);
        });
    }
));

passport.use(new LocalStrategy(
    function (username, password, done) {
        user.checkUser(username, password, function (error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password;' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    user.findById(id, function (error, user) {
        if (error) {
            return done(error);
        }
        if (!user) {
            return done(null, false, { message: 'User deleted' });
        }
        return done(null, user);
    });
});

exports.passport = passport;