var express = require('express');
var app = express();

// middleware
var morgan = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var path = require('path');
var StatsD = require('node-statsd');
var stats = new StatsD();
var responseTime = require('response-time');
var inspect = require('eyespect').inspector();


// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('requireResult', require('./config/requireResult'));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret : 'secret_session'
}));

app.use(responseTime(function (req, res, time) {
    var params = req.method === 'GET' ? req.query : req.body;
    inspect(params, req.method + ' ' + req.url + ' ' + time.toFixed(3) + ' ms');

    //console.log(app.get('requireResult').libs.testFunction());

    /*var stat = (req.method + req.url).toLowerCase().replace(/[:\.]/g, '').replace(/\//g, '/');
     stats.timing(stat, time);*/
}));

// todo morgan 쓸지 말지 결정하면 된다..
//app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'image', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'bower_components')));


require('./router/router')(app);
module.exports = app;


/*app.listen(3000, function() {
    console.log("server is listening on port %d", 3000);
});*/

/*process.on('uncaughtException', function (err) {
    console.log('uncaughtException : ' + err.toString());
});*/
