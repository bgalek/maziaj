'use strict';

var gulp = require('gulp'),
    express = require('express'),
    path = require('path'),
    http = require('http'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    auth = require('../../src/lib/auth'),
    logger = require('morgan'),
    routes = require('../../src/routes');

//app
var app = module.export = express();

app.set('port', process.env.PORT || config.ports.staticServer);
app.set('env', process.env.ENV || 'development');
app.set('views', path.join(__dirname, '../../' + BUILD_FOLDER));
var staticServerPath = BUILD_FOLDER + '/assets';
if (app.get('env') == 'production') {
    app.set('views', path.join(__dirname, '../../' + RELEASE_FOLDER));
    staticServerPath = RELEASE_FOLDER + '/assets';
}
app.set('view engine', 'jade');
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
app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(express.static(staticServerPath));

app.use('/', routes);

module.exports = gulp.task('serve', function (next) {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        next();
    });
});
