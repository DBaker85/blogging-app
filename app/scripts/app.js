

'use strict';



angular
  .module('BloggingApp', [
  'ngtweet',
  'ngSanitize',
  'angularLazyImg',
  'ngCookies'
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
          return $http.get('/aboutmeContent',{cache:true});
        }
      };
  }])
  .factory('Posts', ['$http', function($http) {
    return {
      getPosts : function(filter,start,limit) {
        return $http.get('/posts?category='+filter+'&start='+start+'&limit='+limit ,{cache:false});
      },
      countPosts : function(category) {
        return $http.get('/post-count/'+category, {cache:false});
      }
    }
  }])
  .factory('Categories', ['$http', function($http) {
    return {
      getCategories : function() {
        return $http.get('/categories', {cache:true});
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
  .controller('CookieBannerController', ['$cookies', function($cookies){
    var vm = this;
    vm.showBanner = false;
    vm.checkCookieStatus = function() {
      let cookieAccepted = $cookies.getObject('acceptCookiePolicy');

      if (cookieAccepted != true){
        vm.showBanner = true;
      }
    };
    vm.acceptCookies = function() {
      vm.showBanner = false;
      $cookies.put('acceptCookiePolicy', true)
    };

    vm.checkCookieStatus();

  }])
  .controller('ContentController', ['$scope','TileContent','$interval', function($scope, TileContent, $interval){
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
        vm.selectedCategory = 'all';
        vm.range = 5;

        vm.postExpander = function(index){
          if( vm.posts[index].open == true){
            vm.posts[index].open = false;
          } else{
            for (var i = vm.posts.length - 1; i >= 0; i--) {
                vm.posts[i].open = false;
              }
              vm.posts[index].open = true;
          }
        };
        vm.fetchposts = function(start){
          Posts.getPosts(vm.selectedCategory,start,vm.range).then(function(response){
            vm.posts = response.data;
            vm.createPagination();
           })
        };

        vm.fetchcategories = function(){
          Categories.getCategories().then(function(response){
              vm.categories = response.data;

           })
        };
        vm.createPagination = function(){
          Posts.countPosts(vm.selectedCategory).then(function(response){
              vm.pages = [];
              vm.postCount = response.data.documents;
              vm.activePage = 0;
              vm.amountOfPages = vm.postCount/vm.range;
              for (var i = 0; i < vm.amountOfPages; i++) {
                vm.pages.push(i);
              }
           })
        };
        vm.clearCategory = function(){
          vm.selectedCategory = 'all';
          vm.fetchposts(0,vm.range);
        };
        vm.navigate = function(index){
          vm.activePage = index;
          if(index == 0){
            vm.fetchposts(0);
          } else {
            vm.fetchposts((vm.range*index)+1);
          }


        };

        vm.fetchposts(0);
        vm.fetchcategories();

        // $interval(vm.fetchposts, minutes*10);
      }],
      controllerAs: 'postCtrl',
      bindToController: true
    }
  }]);
