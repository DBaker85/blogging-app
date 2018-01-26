
const fs = require('fs-extra');
const path = require('path');
const formidable = require('formidable');
const walk = require('walk');

function formatBytes(bytes,decimals = 2) {
  if(bytes == 0) return '0 Bytes';
  var k = 1024,
      dm = decimals
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function uploads(){
  this.uploadImages = function(req,res,target,multiples){
    // create an incoming form object
    var form = new formidable.IncomingForm();
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = multiples;
    // store all uploads in the /uploads directory
    form.uploadDir = target;
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      var sanitizedFileName = file.name.toLowerCase()
                              .replace(/[,\!&?#<$+%>`*'|{"=}/:@]/g,"")
                              .replace(/[-\s]/g,"_");
      fs.rename(file.path, path.join(form.uploadDir, sanitizedFileName));
    });
    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.end('success');
    });
    // parse the incoming request containing the form data
    form.parse(req);
  };

  this.uploadArticleCover = function(req,res){
    console.log('uploadArticleCover controller');
    const uploadPath = path.join(__dirname, '..', '..', 'uploads/temp_covers');
    fs.mkdirs(uploadPath, function (err) {
      if (err)  return console.error(err)
        this.uploadImages(req,res,uploadPath, false);

    })
  };

  this.uploadArticleImages = function(req,res,article){
    let uploadPath = path.join(__dirname, '..', '..', 'public/images/images');
    if (article){
      uploadPath = path.join(__dirname, '..', '..', 'public/images/articles/', article, '/');
    }
    fs.mkdirs(uploadPath, function (err) {
      if (err) return console.error(err)
        this.uploadImages(req,res,uploadPath, true);
    })
  };

  this.deleteArticleCover = function(req,res){
    const deletePath = path.join(__dirname, '..', '..', 'uploads/temp_covers',req.query.filename);
    fs.remove(deletePath, function (err) {
    if (err) return console.error(err)
      console.log('success!')
      res.send('ok');
    })
  };

  function searchPath(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].path === nameKey) {
            return i;
        }
    }
}

  this.readFiles = function(req,res){


    var paths =  [

    ]

    function readDefaultImages(){
      var imageFiles = []
      walk.walk(path.join(__dirname, '..', '..', 'public/images/images') ,{})
      .on("file", function(root, fileStat, next){
        imageFiles.push(
          {
            name: fileStat.name,
            size: formatBytes(fileStat.size)
          }
        );
        console.log(fileStat);
        next();
      })
      .on("end", function(){
        paths.push(
          {
            basepath: '/',
            path:'images',
            files: imageFiles
          }
        );
        res.send(paths);
      })
    }



    walk.walk(path.join(__dirname, '..', '..', 'public/images/articles') ,{})
    .on("file", function(root, fileStat, next){
      var file = root.replace(path.join(__dirname, '..', '..', 'public/images/articles/'),'');
      var pathfile = searchPath(file,paths);
      if( pathfile != undefined){
        paths[pathfile].files.push(
          {
            name: fileStat.name,
            size: formatBytes(fileStat.size)
          }
        );
      } else {
        paths.push(
          {
            basepath:'/articles/',
            path: file,
            files: [
              {
                name: fileStat.name,
                size: formatBytes(fileStat.size)
              }
            ]
          }
        )
      }
      next()
    })
    .on("end", function(){
      readDefaultImages()
    })


  }

}

  module.exports = uploads;
