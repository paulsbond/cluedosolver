(function(){
  var app = angular.module('app');

  app.directive('aDisabled', function() {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {

        //Toggle "disabled" to class when aDisabled becomes true
        scope.$watch(attrs.aDisabled, function(val) {
          if (val !== undefined) {
            elem.toggleClass("disabled", val);
          }
        });

        //Disable href on click
        elem.on("click", function(e) {
          if (scope.$eval(attrs.aDisabled)) {
            e.preventDefault();
          }
        });

      }
    };
  });
})();