(function() {
  var app = angular.module('app');

  app.factory('store', ['$localStorage', function($localStorage) {
    return $localStorage;
  }]);
})();
