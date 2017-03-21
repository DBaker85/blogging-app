
module.exports = function(app) {

require('../controllers/uploads')(app);

  app.post('/uploads/article/cover', function(req,res){
    uploadArticleCover(req,res);
  })
  app.delete('/uploads/article/cover', function(req,res){
    deleteArticleCover(req,res);
  })
  app.post('/uploads', function(req,res){
    // console.log(req.query);
    uploadArticleImages(req,res,req.query.article);
  })

  app.get('/gallery', function(req,res){
    readFiles(req,res);
  });

}
