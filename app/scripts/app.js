
// var expandArea = function(context){
//   var expandBox = '<div class="area"></div>'
//   context.parents('.level').append(expandBox)
// }

// $(document).ready(function(){

//   $('.box').on('click', function(){
//     if ($(this).data("expand")==true){
//       $(this)
//         .toggleClass('expand-box')
//         .parents('.level')
//         .toggleClass('expand')
//         .attr('data-theme',$(this).data('theme'));
//     }
//   })

// })

'use strict';



angular
  .module('BloggingApp', [])
  .controller('ContentController', ['$scope', function ($scope) {
      var vm = this;
      vm.tiles = [
            {
              'type': 'icon',
              'theme': 'twitter',
              'title': 'Twitter',
              'icon' : 'twitter',
              'expand': true
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
            },
            {
              'type': 'icon',
              'theme': '1',
              'title': 'Default',
              'icon' : 'menu',
              'expand': true
            },
            {
              'type': 'image',
              'theme': '1',
              'title': 'Default',
              'image' : 'bicycle',
              'expand': true
            }

      ];
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
        title:'@'
      },
      controller: ['$scope', function ($scope){
        $scope.expanded = false;
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


