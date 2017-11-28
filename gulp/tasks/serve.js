'use strict';

var gulp = require('gulp'),
    express = require('express'),
    i18n = require("i18n"),
    path = require('path'),
    http = require('http'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    auth = require('../../src/lib/auth'),
    logger = require('morgan');

i18n.configure({
    locales: ['pl', 'en'],
    directory: path.join(__dirname, '../../locales')
});

//app
var app = module.export = express();

app.set('port', process.env.PORT || config.ports.staticServer);
app.set('views', path.join(__dirname, '../../' + BUILD_FOLDER));
app.locals.pretty = true;

var staticServerPath = BUILD_FOLDER + '/assets';
if (global.production) {
    app.set('views', path.join(__dirname, '../../' + RELEASE_FOLDER));
    staticServerPath = RELEASE_FOLDER + '/assets';
    app.locals.pretty = false;
}

app.set('view engine', 'jade');
app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET || config.cookie.secret,
    resave: true,
    saveUninitialized: true
}));
app.use('/', require('../../src/routes'));
app.use('/login', require('../../src/routes/login.js'))

app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(express.static(staticServerPath));

module.exports = gulp.task('serve', function (next) {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        next();
    });
});
