angular
.module('BloggingApp')
.controller('LoginController', ['$cookies','$http', '$window', function($cookies, $http, $window){
  var vm = this;
  vm.passwordIncorrect = false;
  vm.createPassword = function(){



    $http.post('/signup', {
      'username':vm.user,
      'password':vm.password
    }).then(function(data){
        console.log(data);
        if (!data.exists){
        //   alertify.success('Password created');
        }
        $window.location.href= '/login';
    }, function(){});

  };

  vm.login = function(){




    $http.post('/login', {
      'username':vm.user,
      'password':vm.password
    }).then(function(response){
        console.log(response.data);
        if(response.data.valid){
          // alertify.success('Password valid');
          if(response.data.redirect){
            $window.location.href = response.data.redirect;
          }
        } else {
        vm.passwordIncorrect = true;

      }

    }, function(){});
  };

  vm.logout = function(){
    //

  };



}])
