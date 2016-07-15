angular
.module('BloggingApp')
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
