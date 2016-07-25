(function(){
  var app = angular.module('app');

  app.controller('HomeController',
    ['$scope', '$location', 'store', 'utils',
    function($scope, $location, store, utils) {

    $scope.utils = utils;

    $scope.newGame = function() {
      $location.url('setup');
    };

    $scope.continue = function() {
      if (utils.dataExists()) $location.url('overview');
    };

    $scope.reset = function() {
      if (window.confirm("Clear all data?"))
      {
        if (utils.dataExists()) store.$reset();
      }
    };

  }]);
})();
