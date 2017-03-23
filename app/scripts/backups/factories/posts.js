angular
  .module('BloggingApp')
  .factory('Posts', ['$http', function($http) {
    return {
      getPosts : function(filter,start,limit) {
        return $http.get('/posts?category='+filter+'&start='+start+'&limit='+limit ,{cache:false});
      },
      countPosts : function(category) {
        return $http.get('/post-count/'+category, {cache:false});
      },
      imageGallery : function() {
        return $http.get('/gallery',{cache: false});
      }
    }
  }])
