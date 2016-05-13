var marked = require('marked');


module.exports = function(app,db) {

	require('../controllers/posts')(db);

	var posts = db.collection('posts');
	var categories = db.collection('categories');

	app.get('/', function (req, res) {
		displayMainPage(req, res);
	});

	app.get('/post/:url', function(req, res){
		url = req.params.url;
		displaySinglePost(req,res,url);
	});

	app.get('/category/:url', function (req, res) {
		displayCategoryPage(req, res, req.params.url);
	});

	app.get('/about', function (req, res) {
    	displayAboutPage(req, res);
  	});

  app.get('/cookies', function (req, res) {
    	displayCookiePage(req, res);
  });

}
