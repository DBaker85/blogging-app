var marked = require('marked');


module.exports = function(app,db) {

	require('../controllers/posts')(db);

	var posts = db.collection('posts');
	var categories = db.collection('categories');

	app.get('/', function (req, res) {
      res.render('_landing/index', {
        pagetitle: blogName+' | '+blogTagLine
      });
	});

  app.get('/posts', function(req,res){
    getPosts(req,res)
  })

  app.get('/category/:url', function(req,res){
    console.log('filtering by'+req.params.url)
    getPostsByCategory(req,res,req.params.url);
  })

  app.get('/categories', function(req,res){
    getCategories(req,res);
  })

	app.get('/post-count/:category', function(req,res){
    getPostCount(req,res, req.params.category);
  })



	// app.get('/post/:url', function(req, res){
	// 	url = req.params.url;
	// 	displaySinglePost(req,res,url);
	// });

	// app.get('/category/:url', function (req, res) {
	// 	displayCategoryPage(req, res, req.params.url);
	// });

	// app.get('/about', function (req, res) {
 //    	displayAboutPage(req, res);
 //  	});

 //  app.get('/cookies', function (req, res) {
 //    	displayCookiePage(req, res);
 //  });

 //  app.get('/aboutmeContent', function (req, res) {
 //      sendAboutmeData(req, res);
 //  });

}
