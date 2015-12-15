var crypto = require('crypto');
var request = require('request');

function admin(db){
  var oldcategory;
  var posts = db.collection('posts');
  var categories = db.collection('categories');
  var passwords = db.collection('password');
  var visitStats = db.collection('visitStats');


    this.displayAdminPage = function(req, res) {
    "use strict";

    if (req.session.user){
      getPosts(function(err, results) {
        "use strict";

        if (err) return next(err);

        getCategories(function(err, categories) {
          getStats(function(err, stats) {
          return res.render('_admin/admin', {
            posts: results,
            categories : categories,
            stats: stats,
            pagetitle : 'Admin panel | '+blogName
          });
          });
        });
      });
    } else {
      return res.redirect('/login');
    }
  }

    this.getStats = function(callback){

    visitStats.find().sort({date: -1}).toArray(function (err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (result.length) {
        console.log('Found:', result.length);
        callback(err, result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
        callback(err, false);
      }
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






}

module.exports = admin;
