module.exports = function(app,db) {

  require('../controllers/search')(db);

  app.get('/api/search', function (req, res) {
    var searchQuery = req.query.q;
    displaySearchPage(req, res, searchQuery);
  });

}
