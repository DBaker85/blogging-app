

'use strict';



angular
  .module('BloggingApp', [
  'ngtweet',
  'ngSanitize'
  ])
  .factory('TileContent', ['$http', function ($http) {
      return {
        codeschool: function() {
          return $http.get('https://www.codeschool.com/users/1725520.json',{cache:false});
        },
        duolingo: function() {
          return $http.get('https://www.duolingo.com/api/1/users/show?username=David658748',{cache:false});
        },
        aboutMe: function(){
          return $http.get('/aboutmeContent',{cache:false});
        }
      };
  }])
  .factory('Posts',['$http', function($http) {
    return {
      getPosts : function(){
        return $http.get('/posts',{cache:false});
      }
    }
  }])
  .filter("limit", ['$filter',function($filter) {
    return function(data) {
      if (!data) return data;
      return data.slice(0,300)+' ...';
    };
  }])
  .controller('ContentController', ['$scope','TileContent','$interval', function ($scope, TileContent,$interval) {
      var vm = this;
      var minutes = 1000*60;

      vm.openSide = false;

      vm.expander = function(index){
          if (vm.tiles[index].expand == true && !vm.tiles[index].error){
          if (vm.tiles[index].expanded){
            vm.tiles[index].expanded = false
          } else {
            for (var i = vm.tiles.length - 1; i >= 0; i--) {
              vm.tiles[i].expanded = false;
            }
            vm.tiles[index].expanded = true;
          }
        }

        };

      vm.tiles = [
            {
              'type': 'image',
              'theme': 'about',
              'title': 'About Me',
              'image' : 'avatar',
              'expand': true
            }
            ,
            {
              'type': 'icon',
              'theme': 'twitter',
              'title': 'Twitter',
              'icon' : 'twitter',
              'expand': true,
              'state' : 'loaded'
            }
            ,
             {
              'type': 'icon',
              'theme': 'duolingo',
              'title': 'Duolingo',
              'icon' : 'duolingo',
              'expand': true
            },
            {
              'type': 'icon',
              'theme': 'codeschool',
              'title': 'Codeschool',
              'icon' : 'codeschool',
              'expand': true
            }
      ];


      vm.populateTiles = function(){
        TileContent.duolingo()
        .then(function(response){
            var duolingoTile = vm.tiles[2]
            duolingoTile.content = response.data;
            duolingoTile.state = 'loaded';
        }, function(error){
            var duolingoTile = vm.tiles[2]
            duolingoTile.state = 'loaded';
            duolingoTile.error = true;
            duolingoTile.title = 'An error occured';
        });


    TileContent.codeschool()
        .then(function(response){
            var codeschoolTile = vm.tiles[3];
            codeschoolTile.state = 'loaded';
            codeschoolTile.content = response.data;
        }, function(error){
            var codeschoolTile = vm.tiles[3]
            codeschoolTile.state = 'loaded';
            codeschoolTile.error = true;
            codeschoolTile.title = 'An error occured';
        });

    TileContent.aboutMe()
        .then(function(response){
            var aboutMeTile = vm.tiles[0];
            aboutMeTile.state = 'loaded';
            aboutMeTile.content = response.data.about;
        }, function(error){
            var aboutMeTile = vm.tiles[0]
            aboutMeTile.state = 'loaded';
            aboutMeTile.error = true;
            aboutMeTile.title = 'An error occured';
        });


      };

    vm.populateTiles();
    // $interval(vm.populateTiles, minutes*10);

}])
  .directive('postBloc',[function(){
    return{
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/post.html',
      controller: ['Posts','$interval', function(Posts, $interval){
        var vm = this
        var minutes = 1000*60;
        vm.fetchposts = function(){
          Posts.getPosts().then(function(response){
              vm.posts = response.data
           })
        }
        vm.fetchposts();
        // $interval(vm.fetchposts, minutes*10);
      }],
      controllerAs: 'postCtrl',
      bindToController: true
    }
  }])


