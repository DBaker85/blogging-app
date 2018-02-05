// required modules and declare express variable
var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var MongoClient = require('mongodb').MongoClient;

var session      = require('client-sessions');
var contentJson  = require('./content/content.json');
var useragent    = require('express-useragent');
var cookieParser = require('cookie-parser');
// var marked       = require('marked');
// var logger       = require('morgan');
// var gutil        = require('gulp-util');
var path         = require('path')

var errorHandler = require('errorhandler');
var exports      = module.exports = {};

// set express render engine
// app.set('view engine', 'pug');
// app.set('views', './views/');

// gutil.log(process.env.NODE_ENV);

// if port is set in config use that else use env port (heroku requirement)
if (contentJson.config.port) {
  app.set('port', (8888));
} else {
  app.set('port', (process.env.PORT))
}

// set blogname and tagline
// global.blogName = contentJson.blogSetup.blogname;
// global.blogTagLine = contentJson.blogSetup.blogTagLine;
// app.locals.siteTitle = blogName;
// app.locals.siteTagLine = blogTagLine;

// use content from JSON
// app.locals.content = contentJson;

// use marked everywhere
// app.locals.marked = marked;

// Use middleware
app.use(bodyParser.json());
// - useragent sniffer for stats
app.use(useragent.express());

app.enable('trust proxy');
// app.use(logger('dev'));
app.use(errorHandler());


app.use(session({
  cookieName: 'session',
  secret: contentJson.config.sessionSecret,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// - cookie parsers
app.use(cookieParser());

app.use(express.static('dist'));

// - pass blogname and title to all responses
app.use(function(req, res, next){
  // check visit stats
  // logVisit(req,res);
  next();
});




const url = contentJson.config.mongoConnect;
const dbName = contentJson.config.dbName;

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    const db = client.db(dbName);

    // console.log(locals);
    // // require routes and controllers
    require('./routes/posts')(app,db);
    // require('./routes/admin')(app,db);
    // require('./routes/search')(app,db);
    // require('./routes/colorchanger')(app);

    require('./routes/uploads')(app);

    // // Handle routes that are not found and give them 404 status
    // app.get('*', function (req, res, next) {
    //   var err = new Error();
    //   err.status = 404;
    //   next(err);
    // });

    // // handling Errors
    // app.use(function (err, req, res, next) {
    //   if (err.status !== 404) {
    //     return next();
    //   }
    //   gutil.log(`cannot find link ${req.url}`)
    // });
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname,'..', 'dist/index.html'));
    });

  }

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

  exports.closeServer = function(){
    db.close();
  };

})
