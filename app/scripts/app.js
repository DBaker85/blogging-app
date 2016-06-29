

'use strict';



angular
  .module('BloggingApp', [
  'ngtweet',
  'ngSanitize',
  'angularLazyImg'
  ])
  .factory('TileContent', ['$http', function ($http) {
      return {
        codeschool: function() {
          return $http.get('https://www.codeschool.com/users/1725520.json',{cache:false});
        },
        duolingo: function() {
          return $http.get('https://www.duolingo.com/api/1/users/show?username=David658748',{cache:false});
        },
        aboutMe: function() {
          return $http.get('/aboutmeContent',{cache:false});
        }
      };
  }])
  .factory('Posts', ['$http', function($http) {
    return {
      getPosts : function() {
        return $http.get('/posts', {cache:false});
      },
      filterPosts : function(filter) {
        return $http.get('/category/'+filter, {cache:false});
      }
    }
  }])
  .factory('Categories', ['$http', function($http) {
    return {
      getCategories : function() {
        return $http.get('/categories', {cache:false});
      }
    }
  }])
  .filter("limit", [function() {
    return function(data,open) {
      if (open == true){
        return data
      } else {
        return data.slice(0,300)+' ...';
      }

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
      controller: ['Posts','Categories','$interval', function(Posts,Categories,$interval){
        var vm = this
        var minutes = 1000*60;

        vm.postExpander = function(index){
          console.log(index);
          if( vm.posts[index].open == true){
            vm.posts[index].open = false;
          } else{
            for (var i = vm.posts.length - 1; i >= 0; i--) {
                vm.posts[i].open = false;
              }
              vm.posts[index].open = true;
          }
        };
        vm.fetchposts = function(){
          Posts.getPosts().then(function(response){
            vm.posts = response.data;
            vm.selectedCategory = "";
            console.log(vm.posts)
           })
        };
        vm.filterposts = function(filter){
          Posts.filterPosts(filter).then(function(response){
              vm.posts = response.data;
              console.log(vm.posts);
              vm.selectedCategory = filter;
           })
        };
        vm.fetchcategories = function(){
          Categories.getCategories().then(function(response){
              vm.categories = response.data;
              console.log(vm.categories)
           })
        };
        vm.fetchposts();
        vm.fetchcategories();
        // $interval(vm.fetchposts, minutes*10);
      }],
      controllerAs: 'postCtrl',
      bindToController: true
    }
  }]);


