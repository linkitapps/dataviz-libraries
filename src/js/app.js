angular.module('app', ['app.config', 'app.routes', 'app.services', 'app.controllers', 'routeSecurity', 'templates.app',])

.run(['$rootScope', 'FBSimpleLoginService', function($rootScope, FBSimpleLoginService) {
  $rootScope.auth = FBSimpleLoginService.init();
}]);