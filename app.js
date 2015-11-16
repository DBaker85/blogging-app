// required modules and declare express variable
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var session = require('client-sessions');

// set express render engine
app.set('view engine', 'jade');
app.set('views', './app/views/');
// use the commented one for deployment
// app.set('port', (process.env.PORT || 4040));
app.set('port', (4040));

// set blogname and tagline
global.blogName = 'Blog name';
global.blogTagLine = 'Tagline';

// Use middleware
app.use(bodyParser.json());

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));



app.use(express.static('public'));

// - pass blogname and title to all responses
app.use(function(req, res, next){
  res.locals.siteTitle = blogName;
  res.locals.siteTagLine = blogTagLine;
  next();
});



var url = 'mongodb://localhost:27017/blog';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

    console.log('Connection established to', url);

    // require routes and controllers
    require('./app/routes/posts')(app,db);
    require('./app/routes/admin')(app,db);
    require('./app/routes/colorchanger')(app);


    // Handle routes that are not found and give them 404 status
    app.get('*', function (req, res, next) {
      var err = new Error();
      err.status = 404;
      next(err);
    });

    // handling Errors
    app.use(function (err, req, res, next) {
      if (err.status !== 404) {
        return next();
      }
      displayErrorPage(req, res, 404);
    });
  }

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
})





