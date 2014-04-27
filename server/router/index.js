
/**
 * This is the top level for all routes
 */

module.exports = function (app) {

	app.use('/signup', require('./routes/signup'));

};