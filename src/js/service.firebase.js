angular.module('app.service.firebase', ['firebase'])

.factory('firebaseRef', ['Firebase', 'FBURL', function(Firebase, FBURL) {
  // firebaseRef();                // return '<firebase-url>';
  // firebaseRef('mina');          // return '<firebase-url>/mina';
  // firebaseRef('users','mina');  // return '<firebase-url>/users/mina';

  return function(path) {
    var ref = [FBURL].concat(Array.prototype.slice.call(arguments)).join('/');
    return new Firebase(ref);
  };
}])

.service('syncData', ['$firebase', 'firebaseRef', function($firebase, firebaseRef) {
  // syncData();                   // return $firebase( firebaseRef() )
  // syncData('users');            // return $firebase( firebaseRef('users') )
  // syncData('users', 10);        // return $firebase( firebaseRef('users').limit(10) )

  return function(path, limit) {
    var ref = firebaseRef(path);
    // limit && (ref = ref.limit(limit));
    return $firebase(ref);
  };
}]);
