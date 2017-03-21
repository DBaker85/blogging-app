
module.exports = function(app,db) {
  require('../controllers/posts')(db);
  require('../controllers/login')(db);
  require('../controllers/categories')(db);

	var posts = db.collection('posts');
  var categories = db.collection('categories');
  var password = db.collection('password');

    app.get('/admin', function (req, res) {
      if (req.session.user){
          "use strict";
            return res.render('_admin/admin', {
              pagetitle : 'Admin panel | '+blogName,
              appname: "BloggingAppAdmin"
            });
      } else {
        return res.redirect('/login');
      }
  	});



  	app.post('/submit-post', function(req, res){
    	createPost(req, res);
  	});

    app.post('/create-category', function(req, res){
      createCategory(req, res);
    });

    app.post('/edit-post', function(req, res){
      getEditPost(req, res);
    });

    app.put('/edit-post', function(req, res){
      EditPost(req, res);
    });

    app.get('/category-list', function(req,res){
      getCategoryList(req,res);
    })

    app.put('/categories', function(req,res){
      addCategory(req,res);
    })




  	app.delete('/post', function(req, res){
    updateCategoryStatus(req.query.category);
    posts.removeOne({postId:req.query.postId}, function(err, result){

      if (err) {
        res.send(500);
      }else {
        res.send(200);
      }
    })

  });

    app.get('/login', function(req, res){
      login(req, res);
    });

    app.post('/signup', function(req, res){
      createPassword(req, res);
    });

    app.post('/login', function(req, res){
      fetchPassword(req, res);
    });

    app.post('/logout', function(req, res){
      logout(req, res);
    });





}
