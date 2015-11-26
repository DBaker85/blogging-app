// required modules and declare express variable
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var session = require('client-sessions');
var contentJson = require('./app/content/content.json')

// set express render engine
app.set('view engine', 'jade');
app.set('views', './app/views/');

// if port is set in config use that else use env port (heroku requirement)
if (contentJson.config.port) {
  app.set('port', (contentJson.config.port));
} else {
  app.set('port', (process.env.PORT))
}

// use content from JSON
app.locals.content = contentJson;

// set blogname and tagline
global.blogName = contentJson.blogSetup.blogname;
global.blogTagLine = contentJson.blogSetup.blogTagLine;

console.log()
// Use middleware
app.use(bodyParser.json());

app.use(session({
  cookieName: 'session',
  secret: contentJson.config.sessionSecret,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// secret: 'random_string_goes_here',

app.use(express.static('public'));

// - pass blogname and title to all responses
app.use(function(req, res, next){
  res.locals.siteTitle = blogName;
  res.locals.siteTagLine = blogTagLine;
  next();
});



var url = contentJson.config.mongoConnect;

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    // console.log(locals);

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





