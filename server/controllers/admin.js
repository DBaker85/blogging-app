var crypto = require('crypto');
var request = require('request');
var formidable = require('formidable');

function admin(db){
  var oldcategory;
  var posts = db.collection('posts');
  var categories = db.collection('categories');
  var passwords = db.collection('password');
  var visitStats = db.collection('visitStats');

  this.getStats = function(req,res){
    visitStats.aggregate([{$group:{_id:{country:{$country:"$country"}}}}]).toArray(function (err, result){
      console.log(result);
    })
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
