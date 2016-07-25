(function(){
  var app = angular.module('app');

  app.directive('csNav',
    ['$location', 'utils',
    function($location, utils) {

    return {
      restrict: 'E',
      templateUrl: 'directives/cs_nav.html',
      scope: true,
      link: function(scope, elem, attrs) {
        scope.dataExists = utils.dataExists;
      }
    };

  }]);
})();
