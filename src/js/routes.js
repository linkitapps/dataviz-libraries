angular.module('app.routes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'partials/main.tpl.html',
      controller: 'MainCtrl',
    })
    .when('/list', {
      templateUrl: 'partials/list.tpl.html',
      controller: 'ListCtrl'
    })
    .when('/setting', {
      authRequired: true,
      templateUrl: 'partials/setting.tpl.html',
      controller: 'SettingCtrl'
    })
    .when('/admin', {
      templateUrl: 'partials/admin.tpl.html',
      controller: 'AdminCtrl'
    })
    .otherwise({
      redirectTo:'/main'
    });
   // configure html5 to get links working on jsfiddle
   // $locationProvider.html5Mode(true);
}]);