var crypto = require('crypto');


function passwordHandler(db){

passwords = db.collection('password');

this.createPassword = function(req,res){
      passwords.findOne({user:req.body.username}, function(err, result){
        if (err){}
          if (result != undefined){
            res.json({exists: true});
          } else {
            crypto.randomBytes(16, function (err, salt) {
              if (err) { throw err; }
              salt = new Buffer(salt).toString('hex');
              crypto.pbkdf2(req.body.password, salt, 10000, 256, function (err, hash) {
                if (err) { throw err; }
                var userdetails = {
                  user: req.body.username,
                  salt: salt,
                  password: hash.toString('hex')
                };
                passwords.insert(userdetails, function(err,result){
                  if (err) {throw err;}
                  res.json({exists: false});
                });
              });
            });
          };
        });
    }



    this.fetchPassword = function(req, res){
      passwords.findOne({user:req.body.username}, function(err, result){
        if (result != null){
        checkPassword(req.body.password, result.salt, result.password, function(err, passwordValid){
          console.log(passwordValid)
          if (passwordValid == true){
            console.log('password match');
            req.session.user = req.body.username;
            res.json({valid: true, redirect:'/admin'});
          } else{
            console.log('password not match');
            res.json({valid: false})
          }
        });
      } else{
        res.json({valid: false});
      }
      })

    }

    this.checkPassword = function(pass, salt, savedhash, callback){
      crypto.pbkdf2(pass, salt, 10000, 256, function (err, hash) {
        if (err) { callback(err, null) }
          evaluatedhash = hash.toString('hex');
        if (savedhash === evaluatedhash){
          callback(null, true)
        }else{
          callback(null, false)
        }
      });
    }

    this.login = function(req, res) {
    "use strict";
    getCategories(function(err, categories) {
      if (err) {
        displayErrorPage(req,res,500);
      } else {
        // check session to see if logged in if so show logged version of page
        if (req.session.user){
          return res.render('_admin/login', {
            categories: categories,
            login: 'logged',
            pagetitle : 'Logout | '+blogName
          });
        } else {
            // if not logged, check to see if passwords exist in the database
            passwords.find().toArray(function(err, result){
              // if password exists then show login version of page
              if(result.length > 0){
                return res.render('_admin/login', {
                  categories: categories,
                  login: 'notlogged',
                  pagetitle : 'Log in | '+blogName
                });
              }else{
                  // if password does not exist in database, show create admin password version of page
                  return res.render('_admin/login', {
                    categories: categories,
                    login: 'nopass',
                    pagetitle : 'Create password | '+blogName
                  });
                }
            })
        }
      }
    })
  };

  this.logout = function(req, res){
  	req.session.reset();
  	res.redirect('/')
  }


}

module.exports = passwordHandler;
