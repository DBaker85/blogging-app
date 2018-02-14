function categoryHandler(db){


  var posts = db.collection('posts');
  var categories = db.collection('categories');

  this.updateCategoryStatus = function(category) {
    posts.find({category: category},function(err,result){
      if(err){
        console.log('error finding category')
      }
      if(!result.length){
            categories.update({"subcategories.subcategory" : category}, {"$set" : {"subcategories.$.active" : false}}, function(err, inserted) {
              if(err){
                console.log('catgegory not updated');
              }
            })
          }
        })
  }

  this.getCategories = function(callback){
    categories.find().toArray(function (err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (result.length) {
        console.log(result)
        callback(err, result);
      } else {
        callback(err, false);
      }
    });
  };

  this.displayCategoryPage = function(req, res, category) {
    "use strict";

    getPostsByCategory(category,function(err, results) {
      "use strict";

      if (err) return next(err);
      getCategories(function(err, categories) {
        return res.render('_landing/postlist', {
          posts: results,
          categories: categories,
          pagetitle: category+' posts | '+blogName
        });
      });
    });
  };

  this.getCategoryList = function(req,res){
    getCategories(function(err, categories) {
      if (err) return next(err);
      return res.render('_admin/category-list', {
        categories: categories
      });
    })
  }

  this.addCategory = function(req, res){

    //{
    //  "category":"web development",
    //  "subcategories": [
      //  {"subcategory":"nodejs","active":true},
      //  {"subcategory":"mongodb","active":true},
      //  {"subcategory":"sass","active":false}
      //]
    //}
      var subcategoryList = [];

      for (var i = req.body.subcategories.length - 1; i >= 0; i--) {
        subcategoryList.push({"subcategory":req.body.subcategories[i],"active":false})
      };

      var category = {
        category: req.body.category,
        subcategories: subcategoryList
      };

      console.log(category);
      categories.insert(category, function(err, inserted) {
        if(err) {
          res.send('err');
        } else {
          res.send('ok')
        };
      });

};

}

module.exports = categoryHandler;
