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
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 180);
    $cookies.put('acceptCookiePolicy', true, {expires: expiryDate})
  };

  vm.checkCookieStatus();

}])
