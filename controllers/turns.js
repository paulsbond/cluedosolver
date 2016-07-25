(function(){
  var app = angular.module('app');
  
  app.controller('TurnsController',
    ['$scope', '$location', 'store',
    function($scope, $location, store) {

    $scope.store = store;

    $scope.summary = function(turn, index) {
      var r = turn.responses[index];
      switch (r.type) {
        case "hasNone":
          return r.player + " couldn't show a card";
        case "hasUnknown":
          return r.player + " showed an unknown card";
        case "hasSuspect":
          return r.player + " showed " + turn.suspect;
        case "hasWeapon":
          return r.player + " showed " + turn.weapon;
        case "hasLocation":
          return r.player + " showed " + turn.location;
        default:
          return r.player + " didn't respond";
      }
    };

    $scope.undoTurn = function() {
      if (store.previousState !== undefined &&
          window.confirm("Undo last turn?")) {
        store.turns = store.previousState.turns;
        store.deductions = store.previousState.deductions;
        store.possibilities = store.previousState.possibilities;
        delete store.previousState;
      }
    };

  }]);
})();
