angular.module('app.service.fbSimpleLogin', ['firebase', 'app.service.firebase'])

.factory('FBSimpleLoginService', ['$firebaseSimpleLogin', 'firebaseRef', function($firebaseSimpleLogin, firebaseRef) {
  var auth = null;

  return {
    init: function() {
      return auth = $firebaseSimpleLogin(firebaseRef());
    },

    login: function(email, password, callback) {
      auth.$login('password', {
        'email'     : email,
        'password'  : password,
        'rememberMe': true
      }).then( 
        function(user) {
          if (callback) {
            callback(null, user);
          }
        },
        callback
      );
    },

    logout: function() {
      auth.$logout();
    }
  };
}]);
