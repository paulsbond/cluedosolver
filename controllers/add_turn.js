(function(){
  var app = angular.module('app');

  app.controller('AddTurnController', 
    ['$scope', '$location', '$filter', 'store', 'logic', 'utils',
    function($scope, $location, $filter, store, logic, utils) {

    $scope.store = store;

    var initResponses = function() {
      var i = utils.getPlayerIndex(store.turn.player);
      var newResponses = [];
      var numPlayers = store.players.length;
      while (newResponses.length < numPlayers - 1) {
        i++;
        if (i === numPlayers) i = 0;
        newResponses.push({
          player: store.players[i].name,
          type: "null"
        });
      }
      if (store.turn.responses !== undefined) {
        for (var i=0; i<store.turn.responses.length; i++) {
          newResponses[i].type = store.turn.responses[i].type;
        }
      }
      store.turn.responses = newResponses;
    };

    var processResponse = function(r) {
      var suspect = store.turn.suspect;
      var weapon = store.turn.weapon;
      var location = store.turn.location;
      switch (r.type) {
        case "hasNone":
          logic.addDeduction(r.player, suspect, false);
          logic.addDeduction(r.player, weapon, false);
          logic.addDeduction(r.player, location, false);
          break;
        case "hasUnknown":
          logic.addPossibility(r.player, [suspect, weapon, location]);
          break;
        case "hasSuspect":
          logic.addDeduction(r.player, suspect, true);
          break;
        case "hasWeapon":
          logic.addDeduction(r.player, weapon, true);
          break;
        case "hasLocation":
          logic.addDeduction(r.player, location, true);
          break;
      }
    };

    $scope.$watch('store.turn.player', function() {
      initResponses();
    });

    $scope.someoneResponded = function() {
      for (var i=0; i<store.turn.responses.length; i++) {
        if (store.turn.responses[i].type !== "null") return true;
      }
      return false
    };

    $scope.submit = function() {

      store.previousState = {
        turns: angular.copy(store.turns),
        deductions: angular.copy(store.deductions),
        possibilities: angular.copy(store.possibilities)
      };

      store.turns.push(store.turn);

      for (var i in store.turn.responses) {
        processResponse(store.turn.responses[i]);
      }

      store.turn = utils.getNextTurn();

      $location.url('overview');
    };

  }]);
})();
