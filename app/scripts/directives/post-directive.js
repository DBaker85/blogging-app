angular
  .module('BloggingApp')
  .directive('postBloc',[function(){
    return{
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/post.html',
      controller: ['Posts','Categories','$interval','$rootScope',function(Posts,Categories,$interval,$rootScope){
        var vm = this
        var minutes = 1000*60;
        vm.selectedCategory = 'all';
        vm.range = 5;
        vm.activePage = 0;
        vm.postExpander = function(index){
          if( vm.posts[index].open == true){
            vm.posts[index].open = false;
            $rootScope.expandedArticle = false;
          } else{
            for (var i = vm.posts.length - 1; i >= 0; i--) {
                vm.posts[i].open = false;
              }
              vm.posts[index].open = true;
              $rootScope.expandedArticle = true;
          }
          console.log($rootScope);
        };
        vm.fetchposts = function(start){
          Posts.getPosts(vm.selectedCategory,start,vm.range).then(function(response){
            vm.posts = response.data;
            vm.createPagination();
           })
           if (start == 0){
             vm.activePage = 0;
           }
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
