var crypto = require('crypto');
var request = require('request');
var fs = require('fs-extra');
var isoCountries = require('../content/countries');

function content(db){
  var oldcategory;
  var posts = db.collection('posts');
  var categories = db.collection('categories');
  var passwords = db.collection('password');
  var visitStats = db.collection('visitStats');

  // this.displayAdminPage = function(req, res) {
  //   "use strict";

  //   if (req.session.user){
  //     getPosts(function(err, results) {
  //       "use strict";

  //       if (err) return next(err);

  //       getCategories(function(err, categories) {
  //         getStats(function(err, source,country) {
  //           return res.render('_admin/admin', {
  //             posts: results,
  //             categories : categories,
  //             sources: source,
  //             countries: country,
  //             pagetitle : 'Admin panel | '+blogName
  //           });
  //         });
  //       });
  //     });
  //   } else {
  //     return res.redirect('/login');
  //   }
  // }

  // this.getCountryName = function(countryCode) {
  //   if (isoCountries.hasOwnProperty(countryCode)) {
  //       return isoCountries[countryCode];
  //   } else {
  //       return countryCode;
  //   }
  // }

  // this.getStats = function(callback){
  //   visitStats.aggregate([
  //     {
  //       $group : {
  //       _id : {source: "$userAgent.source"},
  //       count: { $sum: 1 }
  //     }}
  //     ]).sort({_id: 1}).toArray(function (err, source) {
  //       if (err) {
  //         console.log(err);
  //         callback(err, null);
  //       }
  //       visitStats.aggregate([
  //         {
  //           $match: { "userAgent.source" :{ $not: /bot|spider/i }}
  //         },
  //         { $group : {
  //           _id : {country: "$country"},
  //           count: { $sum: 1 }
  //         }}
  //         ]).sort({_id: 1}).toArray(function (err, countries) {
  //           if (err) {
  //             console.log(err);
  //             callback(err, null);
  //           } else if (countries.length) {
  //             console.log(countries);
  //             var country = [];
  //             countries.forEach(function(item){
  //               country.push({
  //                 country: getCountryName(item._id.country),
  //                 count: item.count
  //               })
  //             })
  //             callback(err,source,country);
  //           } else {
  //             console.log('No document(s) found with defined "find" criteria!');
  //             callback(err, false, false);
  //           }
  //         });

  //       });
  // };


this.getPosts = function(req,res){
  posts.find().sort({date: -1}).limit(10).toArray(function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
    } else if (result.length) {
      console.log('Found:', result.length);
      res.send(result)
    }
    // else {
    //   console.log('No document(s) found with defined "find" criteria!');
    //   callback(err, false);
    // }
  });
};

this.getAllPostCount = function(res){
  posts.count({}, function (err, result) {
    if (err) {
      console.log(err);
      res.send(404);
    } else {
      res.send({'documents' : result});
    }
  });
}
this.getCategoryPostCount = function(res,category){
  posts.count({category: category}, function (err, result) {
    if (err) {
      console.log(err);
      res.send(404);
    } else {
      console.log('found '+result+' results for category '+category)
      res.send({'documents' : result});
    }
  });
}

this.getPostCount = function(req,res,category){
  if (category == 'all'){
    this.getAllPostCount(res)
  } else {
    this.getCategoryPostCount(res,category)

  }
};


this.getPostsByCategory = function(req,res,category){

  posts.find({category: category}).sort({date: -1}).toArray(function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
    } else if (result.length) {
       console.log('Found:', result.length);
      res.send(result)
    }
    // else {
    //   console.log('No document(s) found with defined "find" criteria!');
    //   callback(err, false);
    // }
  });
};

this.getCategories = function(req,res){
    categories.find().toArray(function (err, result) {
      if (err) {
      console.log(err);
      res.status(500).send(err)
    } else if (result.length) {
       console.log('Found:', result.length, 'categories');
      res.send(result)
    }
    });
  };




// this.displayAboutPage = function(req, res) {
//   "use strict";
//   getCategories(function(err, categories) {
//     if (err) {
//       displayErrorPage(req,res,500);
//     } else {
//       return res.render('_landing/about', {
//         categories: categories,
//         pagetitle: 'About this website | '+blogName
//       });
//     }
//   });

// }

// this.displayCookiePage = function(req, res) {
//   "use strict";
//   getCategories(function(err, categories) {
//     if (err) {
//       displayErrorPage(req,res,500);
//     } else {
//       return res.render('_landing/cookie', {
//         categories: categories,
//         pagetitle: 'Cookie policy | '+blogName
//       });
//     }
//   });

// }



// this.displaySinglePost = function(req, res, url) {
//   "use strict";
//   getCategories(function(err, categories) {

//     posts.findOne({urlSlug:req.params.url}, function(err, result){
//       if (err) {
//         displayErrorPage(req,res,500);
//       } else if (result != undefined) {
//         return res.render('_landing/post', {
//           post: result,
//           categories: categories,
//           pagetitle: result.title+' | '+blogName
//         });
//       } else {
//         displayErrorPage(req, res, 404);
//       }
//     });
//   });

// }



this.getEditPost = function(req, res) {
  "use strict";

  posts.findOne({postId:req.body.postId}, function(err, result){
    if (err) {
      res.send(500)
    }else if (result != undefined) {
      oldcategory = result.category;
      console.log('from geteditpost '+oldcategory);
      return res.json(result);
    }
  });
}

this.EditPost = function(req, res) {
  "use strict";
  var post = {
    body: req.body.body,
    category : req.body.category,
    editdate : new Date()
  }
  posts.update({postId: req.body.id} ,{$set: post}, function(err, result){
    if (err) {
      res.send(500)
    }else {
     getPosts(function(err, results) {
      "use strict";

      if (err) {
        res.send(err);
      }
      else {
        return res.render('_admin/article-list', {
          posts: results,
        });
      }
    });
   }
 });
  if (oldcategory !== req.body.category){
    updateCategoryStatus(oldcategory);
    oldcategory = '';
  }
  categories.update({"subcategories.subcategory" : req.body.category}, {"$set" : {"subcategories.$.active" : true}}, function(err, inserted) {
    if(err){
      console.log('category not updated');
    }
  });
}





this.displayErrorPage = function(req,res, status) {

  if (status == 404){
    res.render('_landing/index', {
      pagetitle:'Page not found | '+blogName,
      maintext:'404',
      subtext:'Sorry We could not find page: ' + req.url
    })
  } else {
    res.render('_landing/index', {
      pagetitle:'An error occured | '+blogName,
      maintext: 'error',
      subtext:'Sorry an error occured. Please try again',
      message:'message'
    })
  }
}

this.createPost = function(req, res){
  var currentDate = new Date();

  var day = currentDate.getDate();
  var month = currentDate.getMonth()+1;
  var year = currentDate.getFullYear();

    // - create a custom md5 has to serve as ID and not replace the _id which is not good practice
    var hash = crypto.createHash('md5').update(req.body.title+currentDate).digest('hex');
    /*
          take title to create url slug
          convert to lowercase
          remove special characters
          collapse all whitespace to a single whitespace
          split the string into a seperate words
          select first 6 words
          merge into a string again
          replace spaces with hyphens and add the date
          */
          var slug = req.body.title
          .toLowerCase()
          .replace(/[.,\-!&?]/g,"")
          .replace(/\s{2,}/g," ")
          .split(/\s+/)
          .slice(0,6)
          .join(" ")
          .replace(/\s/g, '-')+'_'+day+month+year;

          var post = {
            postId: hash,
            title: req.body.title,
            date: currentDate,
            body: req.body.body,
            urlSlug: slug,
            category : req.body.category
          };

      //- {"category":"web development","subcategories":[{"subcategory":"nodejs","active":true},{"subcategory":"mongodb","active":true},{"subcategory":"sass","active":false}]}
      categories.update({"subcategories.subcategory" : req.body.category}, {"$set" : {"subcategories.$.active" : true}}, function(err, inserted) {
        if(err){
          console.log('category not updated');
        }
      });

      posts.insert(post, function(err, inserted) {
        if(err) {
          res.send('err');
        } else {
          getPosts(function(err, results) {
            "use strict";

            if (err) {
              res.send(err);
            }
            else {
              return res.render('_admin/article-list', {
                posts: results,
              });
            }
          });
        };
      });

    };

    this.logVisit = function(req,res){
      if (!req.cookies.visit){
        iplookup = "http://ipinfo.io/"+req.ip+"/json";
        request(iplookup, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            ipData = JSON.parse(body);
            var visitor =  {
              date: new Date(),
              userAgent: req.useragent,
              city: ipData.city,
              region: ipData.region,
              country: ipData.country
            };
            visitStats.insert(visitor, function(err, inserted){
              if (err) {
                console.log(err);
                return
              }
            })
          }
        })
        // set very long cookie for stats
        var targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 600);
        res.cookie('visit', true, { expires: targetDate});
      }
    }

    this.sendAboutmeData  = function(req,res){
      var aboutme = fs.readJSONSync('./app/content/content.json')
      res.send({"about":aboutme.aboutMe,"twitter":aboutme.Twitter});
    }

  }


  module.exports = content;
