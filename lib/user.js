var mongoskin = require('mongoskin'),
    config = require('../config/config.json'),
    crypto = require('crypto');

var db = mongoskin.db(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/maziaj', {safe: true});
db.bind('users');

module.exports.findOrCreate = function (profile, callback) {
    db.users.findOne({'accounts.id': profile.id, 'accounts.provider': profile.provider}, function (error, user) {
        if (user === null) {
            var model = config.user.model;
            model.created_at = new Date();
            model.display_name = profile.displayName;
            profile._json.provider = profile.provider;
            model.accounts.push(profile._json);
            db.users.insert(model, function (error) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, model);
                }
            });
        } else {
            callback(null, user);
        }
    });
};

module.exports.checkUser = function (username, password, callback) {
    db.users.findOne({'accounts.username': username, 'accounts.password': crypto.createHash('sha256').update(password).digest('base64')},
        function (error, user) {
            if (user === null) {
                callback(error);
            } else {
                callback(null, user);
            }
        }
    );
};

module.exports.findById = function (id, callback) {
    db.users.findById(id, function (error, user) {
        if (user === null) {
            callback(error);
        } else {
            callback(null, user);
        }
    });

};

module.exports.register = function (registerForm, callback) {
    var model = config.user.model;
    model.created_at = new Date();
    model.display_name = registerForm.display_name;
    var profile = {
        'provider': 'local',
        'username': registerForm.username,
        'password': crypto.createHash('sha256').update(registerForm.password).digest('base64'),
        'email': registerForm.email
    };
    model.accounts.push(profile);
    db.users.insert(model, function (error) {
        if (error) {
            callback(error);
        } else {
            callback();
        }
    });
};