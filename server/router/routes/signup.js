// we need express
var express = require('express');
// intialize the router
var router = express.Router();

// This is... oddly enough, mapping to the /signup.
// Even though it says '/' what it really means is the root url
// of the request it's handling.  So since it was called in our
// app.use('/signup', signup); Our function here sees '/' as
// '/signup'
// 
// yes... it's weird.  I don't like the 4.x route better yet?
router.post('/', function (req, res) {
	console.log(req.body);
	res.json({
		'msg': 'success!'
	});
});

module.exports = router;