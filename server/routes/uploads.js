
module.exports = function(app) {

require('../controllers/uploads')(app);

  app.post('/api/uploads/article/cover', function(req,res){
    uploadArticleCover(req,res);
  })
  app.delete('/api/uploads/article/cover', function(req,res){
    deleteArticleCover(req,res);
  })
  app.post('/api/uploads', function(req,res){
    // console.log(req.query);
    uploadArticleImages(req,res,req.query.article);
  })

  app.get('/api/gallery', function(req,res){
    readFiles(req,res);
  });

}
