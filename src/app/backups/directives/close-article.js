angular
  .module('BloggingApp')
  .directive('closeArrow',['$window',function($window){
    return {
      restrict: 'E',
      require: '^postBloc',
      replace: true,
      template: `
      <div class="readmore" ng-click="expand($index)">
        <div class="readmore__text">Read more</div>
        <div class="readmore__close">Close</div><i class="icon-chevron-thin-right"></i>
      </div>
      `,
      link: function (scope, elem, attrs, postBlocCtrl) {
        var windowEl = angular.element($window);
        var handler = function() {
          var parentTop = angular.element(elem.context.parentNode).offset().top;
          var parentBottom = angular.element(elem.context.parentNode).offset().top + angular.element(elem.context.parentNode).height();
          var arrowTop = angular.element(elem).offset().top;
          var arrowBottom = angular.element(elem).offset().top + angular.element(elem).height()
          var css = {};
          // 
          // if (arrowTop <= parentTop){
          //   console.log('top of post');
          //   angular.element(elem).removeAttr( 'style' );
          // } else if (arrowBottom >= parentBottom ){
          //   console.log('bottom of post');
          //   angular.element(elem).removeAttr( 'style' );
          //   angular.element(elem).css({
          //     "margin-top": angular.element(elem.context.parentNode).height() - angular.element(elem).height+"px"
          //   })
          // } else if(arrowBottom < parentBottom && arrowTop > parentT) {
          //   console.log('inside post');
          //   angular.element(elem).removeAttr( 'style' );
          //   angular.element(elem).css({
          //     "position":"fixed",
          //     "top":"50px"
          //   })
          // }



        }

        scope.expand = function(index){
          if (elem.expanded){
            elem.expanded = false;
            windowEl.off('scroll.arrow');
            angular.element(elem).removeAttr( 'style' );
          } else {
            windowEl.on('scroll.arrow', scope.$apply.bind(scope, handler));
            elem.expanded = true;
          }
          postBlocCtrl.postExpander(index);
        }
      }
    }

  }]);
