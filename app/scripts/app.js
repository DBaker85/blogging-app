

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
  .controller('ContentController', ['$scope','TileContent','$element', function ($scope, TileContent,$element) {
      var vm = this;


      vm.tiles = [
            {
              'type': 'image',
              'theme': 'about',
              'title': 'About Me',
              'image' : 'avatar',
              'expand': true,
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
              'expand': true,
            },
            {
              'type': 'icon',
              'theme': 'codeschool',
              'title': 'Codeschool',
              'icon' : 'codeschool',
              'expand': true,
            }
      ];


    TileContent.duolingo()
        .then(function(response){
            var duolingoTile = vm.tiles[2]
            console.log(response.data);
            duolingoTile.state = 'loaded';
            duolingoTile.content = '<div><i class="icon-clock"></i></div>'
        }, function(error){
            var duolingoTile = vm.tiles[2]
            duolingoTile.state = 'loaded';
            duolingoTile.error = true;
            duolingoTile.title = 'An error occured';
        });


    TileContent.codeschool()
        .then(function(response){
            var codeschoolTile = vm.tiles[3];
            console.log(response.data);
            codeschoolTile.state = 'loaded';
        }, function(error){
            var codeschoolTile = vm.tiles[3]
            codeschoolTile.state = 'loaded';
            codeschoolTile.error = true;
            codeschoolTile.title = 'An error occured';
        });
    TileContent.aboutMe()
        .then(function(response){
            var aboutMeTile = vm.tiles[0];
            console.log(response.data);
            aboutMeTile.state = 'loaded';
        }, function(error){
            var aboutMeTile = vm.tiles[0]
            aboutMeTile.state = 'loaded';
            aboutMeTile.error = true;
            aboutMeTile.title = 'An error occured';
        });



}])
  .directive('contentTiles',[function(){
    return{
      restrict: 'E',
      // replace: true,
      templateUrl: 'templates/tile.html',
      scope: {
        expand:'@',
        theme:'@',
        type:'@',
        image:'@',
        icon:'@',
        title:'@',
        state: '@',
        error: '@',
        content: '@',
        id: '@'
      },
      controller: ['$scope','$element',function ($scope, $element){

        $scope.expander = function(){
          if ($scope.expand == "true" && $scope.error == false && $scope.state == 'loaded'){
            // only id data expand true maybe go through scope directly
            if ($element.find('.tile').hasClass('expanded') == false){
              $element.find('.tile').addClass('expanded');
              $element.siblings('content-tiles').find('.tile').removeClass('expanded');
            } else {
              $element.find('.tile').removeClass('expanded');
            }
          }

        };

      }]
      }
  }])
  .directive('postBloc',[function(){
    return{
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/post.html',
    }
  }])


