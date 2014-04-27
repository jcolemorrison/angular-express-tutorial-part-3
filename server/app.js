var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Route Imports
 */
var signup = require('./routes/signup');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
	
	// This will change in production since we'll be using the dist folder
	// This covers serving up the index page
	app.use(express.static(path.join(__dirname, '../client/.tmp')));
	app.use(express.static(path.join(__dirname, '../client/app')));
	
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

	// changes it to use the optimized version for production
	app.use(express.static(path.join(__dirname, '/dist')));

}

/**
 * Routes
 */
var router = require('./router')(app);

// Error Handling
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
});

module.exports = app;
