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
		console.log(req.query)
    getPosts(req,res,req.query.category,req.query.start,req.query.limit);
  })

	app.get('/admin/visit/countries', function (req, res){
		getVisitCountries(function(err,country) {
			res.send(country);
		})
	});

	app.get('/admin/visit/os', function (req, res){
		getVisitOs(function(err,os) {
			res.send(os);
		})
	});

	app.get('/admin/visit/platform', function (req, res){
		getVisitPlatform(function(err,platform) {
			res.send(platform);
		})
	});

	app.get('/admin/visit/browser', function (req, res){
		getVisitBrowser(function(err,browser) {
			res.send(browser);
		})
	});


	app.get('/admin/visit/devices', function (req, res){
		getVisitDevice(function(err,device) {
			res.send(device);
		})
	});

  // app.get('/category/:url', function(req,res){
  //   console.log('filtering by'+req.params.url)
  //   getPostsByCategory(req,res,req.params.url);
  // })

  app.get('/categories', function(req,res){
    getCategories(req,res);
  })

	app.get('/post-count/:category', function(req,res){
    getPostCount(req,res, req.params.category);
  })

	app.post('/submit-post', function(req,res){
		createPost(req,res);
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

  app.get('/aboutmeContent', function (req, res) {
      sendAboutmeData(req, res);
  });

}
