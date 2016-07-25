(function(){
  var app = angular.module('app', ['ngRoute', 'ngStorage']);

  app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'templates/home.html'
      })
      .when('/addturn', {
        controller: 'AddTurnController',
        templateUrl: 'templates/add_turn.html'
      })
      .when('/overview', {
        controller: 'OverviewController',
        templateUrl: 'templates/overview.html'
      })
      .when('/setup', {
        controller: 'SetupController',
        templateUrl: 'templates/setup.html'
      })
      .when('/turns', {
        controller: 'TurnsController',
        templateUrl: 'templates/turns.html'
      })
      .otherwise({redirectTo:'/'});

  }]);
})();
