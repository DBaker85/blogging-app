angular
  .module('BloggingApp')
  .factory('Stats', ['$http', function($http) {
    return {
      countries: function() {
        return $http.get('/admin/visit/countries' ,{cache:false});
      },
      os: function(){
        return $http.get('/admin/visit/os', {cache: false});
      },
      platform: function(){
        return $http.get('/admin/visit/platform', {cache: false});
      },
      devices: function(){
        return $http.get('/admin/visit/devices', {cache: false});
      },
      browser: function(){
        return $http.get('/admin/visit/browser', {cache: false});
      }
    }
  }])
