angular
  .module('BloggingApp')
  .factory('Categories', ['$http', function($http) {
    return {
      getCategories : function() {
        return $http.get('/categories', {cache:false});
      }
    }
  }])
