// var marked = require('marked');
const path = require('path');

module.exports = function(app,db) {

	require('../controllers/posts')(db);

	var posts = db.collection('posts');
	var categories = db.collection('categories');


  app.get('/api/posts', function(req,res){
		console.log(req.query)
    getPosts(req,res,req.query.category,req.query.start,req.query.limit);
	})

		app.get('/api/post', function(req, res){
		url = req.query.url;
		// console.log('getsinglepost',url)
		getSinglePost(req,res,url);
	});

	app.get('/api/admin/visit/countries', function (req, res){
		getVisitCountries(function(err,country) {
			res.send(country);
		})
	});

	app.get('/api/admin/visit/os', function (req, res){
		getVisitOs(function(err,os) {
			res.send(os);
		})
	});

	app.get('/api/admin/visit/platform', function (req, res){
		getVisitPlatform(function(err,platform) {
			res.send(platform);
		})
	});

	app.get('/api/admin/visit/browser', function (req, res){
		getVisitBrowser(function(err,browser) {
			res.send(browser);
		})
	});


	app.get('/api/admin/visit/devices', function (req, res){
		getVisitDevice(function(err,device) {
			res.send(device);
		})
	});

  // app.get('/api/category/:url', function(req,res){
  //   console.log('filtering by'+req.params.url)
  //   getPostsByCategory(req,res,req.params.url);
  // })

  app.get('/api/categories', function(req,res){
    getCategories(req,res);
  })

	app.get('/api/post-count/:category', function(req,res){
    getPostCount(req,res, req.params.category);
  })

	app.post('/api/submit-post', function(req,res){
		createPost(req,res);
	})

	app.get('/api/template/post', function(req,res){
		res.render('_templates/test')
	})



	// app.get('/api/category/:url', function (req, res) {

	// 	displayCategoryPage(req, res, req.params.url);
	// });

	// app.get('/api/about', function (req, res) {
 //    	displayAboutPage(req, res);
 //  	});

 //  app.get('/api/cookies', function (req, res) {
 //    	displayCookiePage(req, res);
 //  });

  app.get('/api/aboutmeContent', function (req, res) {
      sendAboutmeData(req, res);
  });

}
