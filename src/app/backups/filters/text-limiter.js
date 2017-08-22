angular
  .module('BloggingApp')
  .filter("limitHtml", ['$sce',function($sce) {
    return function(data,open) {
      if (open == true){
        return $sce.trustAsHtml(data);
      } else {
        return $sce.trustAsHtml(data.slice(0,300)+' ...');
      }
    };
  }])
