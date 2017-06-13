var crypto = require('crypto');
var request = require('request');
var fs = require('fs-extra');
var isoCountries = require('../content/countries');
var path = require('path');
var formidable = require('formidable');

function content(db){
  var oldcategory;
  var posts = db.collection('posts');
  var categories = db.collection('categories');
  var passwords = db.collection('password');
  var visitStats = db.collection('visitStats');

  this.getCountryName = function(countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
  }

  this.getVisitCountries = function(callback){
        visitStats.aggregate([
          {
            $match: {
              $and: [
                {"country" :{ $ne: null }},
                {"userAgent.platform" :{ $ne: 'unknown' }},
                {"userAgent.isBot" : { $ne: true }},
                {"userAgent.source" :{ $not: /bot|spider/ig }}
              ]

            }
          },
          { $group : {
            _id : {country: "$country"},
            count: { $sum: 1 }
          }}
          ]).sort({_id: 1}).toArray(function (err, countries) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (countries.length) {
              console.log(countries);
              var country = [];
              countries.forEach(function(item){
                country.push({
                  country: getCountryName(item._id.country),
                  count: item.count
                })
              })
              callback(err,country);
            } else {
              console.log('No document(s) found with defined "find" criteria!');
              callback(err, false, false);
            }
          });

        }


  this.getVisitOs = function(callback){
    visitStats.aggregate([
      {
        $match: {
          $and: [
            {"userAgent.source" :{ $not: /bot|spider/ig }},
            {"userAgent.os":{$ne: 'unknown'}}
          ]
        }
      },
      {
        $group : {
        _id : {os: "$userAgent.os"},
        count: { $sum: 1 }
      }}
    ]).sort({_id: 1}).toArray(function (err, os) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (os.length) {
          callback(err,os);
            } else {
              console.log('No document(s) found with defined "find" criteria!');
              callback(err, false);
            }
          });
  };
  this.getVisitPlatform = function(callback){
    visitStats.aggregate([
      {
        $match: {
          $and: [
            {"userAgent.source" :{ $not: /bot|spider/ig }},
            {"userAgent.platform":{$ne: 'unknown'}}
          ]
        }
      },
      {
        $group : {
        _id : {platform: "$userAgent.platform"},
        count: { $sum: 1 }
      }}
    ]).sort({_id: 1}).toArray(function (err, Platform) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (Platform.length) {
          callback(err,Platform);
            } else {
              console.log('No document(s) found with defined "find" criteria!');
              callback(err, false);
            }
          });
  };


  this.getVisitBrowser = function(callback){
    visitStats.aggregate([
      {
        $match: {
          $and: [
            {"userAgent.source" :{ $not: /bot|spider/ig }},
            {"userAgent.platform":{$ne: 'unknown'}},
            {"userAgent.version":{$ne: null}}
          ]
        }
      },
      {
        $group : {
        _id : {
          chrome: "$userAgent.isChrome",
          edge: "$userAgent.isEdge",
          firefox: "$userAgent.isFirefox",
          ie:'$userAgent.isIE',
          opera: '$userAgent.isOpera',
          safari: '$userAgent.isSafari',
          version: {$substr:['$userAgent.version',0,3]}
        },
        count: { $sum: 1 }
      }}
    ]).sort({_id: 1}).toArray(function (err, browser) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (browser.length) {
          callback(err,browser);
            } else {
              console.log('No document(s) found with defined "find" criteria!');
              callback(err, false);
            }
          });
  };

  this.getVisitDevice = function(callback){
    visitStats.aggregate([
      {
        $match: { "userAgent.source" :{ $not: /bot|spider/ig }}
      },
      {
        $group : {
        _id : {
          desktop: "$userAgent.isDesktop",
          tablet: "$userAgent.isTablet",
          mobile: "$userAgent.isMobile"
        },
        count: { $sum: 1 }
      }}
    ]).sort({_id: 1}).toArray(function (err, device) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (device.length) {
          callback(err,device);
            } else {
              console.log('No document(s) found with defined "find" criteria!');
              callback(err, false);
            }
          });
  };



this.getPosts = function(req,res,category,startValue,limitValue){
  var start = parseInt(startValue);
  var limit = parseInt(limitValue);
  if (category == 'all') {


    posts.find().sort({date: -1}).skip(start).limit(limit).toArray(function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err)
      } else if (result.length) {
        console.log('Found:', result.length);
        res.send(result)
      }
    });


  } else {


    posts.find({category: category}).sort({date: -1}).skip(start).limit(limit).toArray(function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err)
      } else if (result.length) {
         console.log('Found:', result.length);
        res.send(result)
      }
    });


  }


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

this.getEditPost = function(req, res) {
  "use strict";
  console.log('inside get edit post '+req.body.postId)
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
    body: req.query.body,
    category : req.query.category,
    editdate : new Date()
  }
  posts.update({postId: req.query.postId} ,{$set: post}, function(err, result){
    console.log(req.query);
    if (err) {
      res.send(500)
    }else {
      res.send(200)
   }
 });

  if (oldcategory !== req.query.category){
    updateCategoryStatus(oldcategory);
    oldcategory = '';
  }
  categories.update({"subcategories.subcategory" : req.query.category}, {"$set" : {"subcategories.$.active" : true}}, function(err, inserted) {
    if(err){
      console.log('category not updated');
    }
  });
}





// this.displayErrorPage = function(req,res, status) {

//   if (status == 404){
//     res.render('_landing/index', {
//       pagetitle:'Page not found | '+blogName,
//       maintext:'404',
//       subtext:'Sorry We could not find page: ' + req.url
//     })
//   } else {
//     res.render('_landing/index', {
//       pagetitle:'An error occured | '+blogName,
//       maintext: 'error',
//       subtext:'Sorry an error occured. Please try again',
//       message:'message'
//     })
//   }
// }

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
            category : req.body.category,
            cover: req.body.cover
          };

      //- {"category":"web development","subcategories":[{"subcategory":"nodejs","active":true},{"subcategory":"mongodb","active":true},{"subcategory":"sass","active":false}]}
      categories.update({"subcategories.subcategory" : req.body.category}, {"$set" : {"subcategories.$.active" : true}}, function(err, inserted) {
        if(err){
          console.log('category not updated');
        }
      });

      // move temp cover to final folder
      const coverPath = path.join(__dirname, '..', '..', 'uploads/temp_covers',req.body.cover);

      const articleCoverPath = path.join(__dirname, '..', '..', 'public/images/articles',slug,'cover',req.body.cover);

      fs.move(coverPath, articleCoverPath, function (err) {
        if (err) return console.error(err)
        console.log("success!")
      })

      posts.insert(post, function(err, inserted) {
        if(err) {
          res.send('err');
        } else {
          res.send(200);
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
