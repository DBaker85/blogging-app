function searchHandler(db) {

 var posts = db.collection('posts');
 var categories = db.collection('categories');

 this.getPostsBySearch = function(search,callback) {
  posts.find({$text: {$search: search}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result) {
    if (err) {
      console.log(err);
      callback(err, null, null);
    } else if (result.length) {
      console.log('Found:', result.length);
      callback(err, result, result.length);
    } else {
      console.log('No document(s) found with defined "find" criteria!');
      callback(err, false, 0);
    }
  });
};

this.displaySearchPage = function(req, res, search) {
  "use strict";
  getPostsBySearch(search,function(err, results, length) {
    "use strict";

    if (err) return next(err);
    getCategories(function(err, categories) {
      return res.render('_landing/search', {
        results: length,
        query: search,
        posts: results,
        categories: categories,
        pagetitle: 'Search results for '+search+' | '+blogName
      });
    });
  });
};

};

module.exports = searchHandler;
