angular
.module('BloggingApp')
.controller('CookieBannerController', ['$cookies','$uibModal', function($cookies,$uibModal){
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
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 180);
    $cookies.put('acceptCookiePolicy', true, {expires: expiryDate})
  };

vm.policy = function(){
  vm.modalInstance = $uibModal.open({
    controller: ['$uibModalInstance',function($uibModalInstance){
      var $modal = this;

      $modal.close = function () {
        $uibModalInstance.close();
      }

      $modal.ok = function () {
        $uibModalInstance.close();
        vm.acceptCookies();
      }

    }],
    controllerAs: '$modal',
    templateUrl: 'templates/modal-cookie-policy.html'
  })
}

  vm.checkCookieStatus();

}])
