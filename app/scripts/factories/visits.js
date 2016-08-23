angular
  .module('BloggingApp')
  .factory('Visits', ['$http', function($http) {
    return function() {
        return $http.get('/admin/visits' ,{cache:false});

    }
  }])
