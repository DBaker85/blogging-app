angular
.module('BloggingApp')
.factory('TileContent', ['$http', function ($http) {
    return {
      codeschool: function() {
        return $http.get('https://www.codeschool.com/users/1725520.json',{cache:false});
      },
      duolingo: function() {
        return $http.get('https://www.duolingo.com/api/1/users/show?username=David658748',{cache:false});
      },
      aboutMe: function() {
        return $http.get('/aboutmeContent',{cache:true});
      }
    };
}])
