//express
var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    http = require('http'),
    logger = require('morgan'),
    less = require('less-middleware'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    auth = require('./lib/auth');

//routes
var routes = require('./routes/index');
var partials = require('./routes/partials');
var game = require('./routes/game');
var login = require('./routes/login');

//app
var app = module.exports = express();

//configuration
var oneDay = 86400000;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'AH%#@$LKFADS)@#%@$:LJKDCXZVC}X{CBCVNAFDADSKFSJD',
    resave: true,
    saveUninitialized: true
}));
app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(less(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/partials', partials);
app.use('/game', game);
app.use('/login', login);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler - no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});