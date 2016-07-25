(function(){
  var app = angular.module('app');

  app.controller('SetupController',
    ['$scope', '$location', 'store', 'utils', 'data', 'logic',
    function($scope, $location, store, utils, data, logic) {

    $scope.store = store;

    $scope.players = [];
    $scope.cardSet = data.cardSets[0];
    $scope.numPlayers = 6;
    $scope.cardSets = data.cardSets;

    $scope.countCards = function() {
      $scope.totalCards = 0;
      for (var i in $scope.players) {
        var player = $scope.players[i];
        player.numCards = Math.floor(18 / $scope.numPlayers);
        if (player.hasExtraCard) player.numCards++;
        $scope.totalCards += player.numCards;
      }
    }

    $scope.$watch('numPlayers', function(val) {
      // Resize players array
      if (val < $scope.players.length) {
        $scope.players = $scope.players.slice(0, val);
      } else {
        while (val !== $scope.players.length) {
          $scope.players.push({});
        }
      }
      // Reset info on extra cards
      for (var i in $scope.players) {
        $scope.players[i].hasExtraCard = false;
      }
      // Recount each players cards
      $scope.countCards();
    });

    $scope.validCardTotal = function() {
      return $scope.totalCards === 18;
    };

    $scope.validHandCount = function() {
      $scope.handCount = 0;
      for (var i in $scope.cardSet.cards) {
        if ($scope.cardSet.cards[i].inHand) $scope.handCount++;
      }
      return $scope.players[0].numCards === $scope.handCount;
    };

    $scope.validHandCards = function() {
      var freeSuspects = 0;
      var freeWeapons = 0;
      for (var i in $scope.cardSet.cards) {
        var card = $scope.cardSet.cards[i];
        if (! card.inHand) {
          if (card.group === "Suspect") freeSuspects++;
          if (card.group === "Weapon") freeWeapons++;
          if (freeSuspects > 0 && freeWeapons > 0) return true;
        }
      }
      return false;
    };

    $scope.validInitials = function() {
      checked = [];
      for (var i = 0; i < $scope.players.length; i++) {
        var name = $scope.players[i].name;
        if (name === undefined || name === "") continue;
        if (checked.indexOf(name) !== -1) return false;
        checked.push(name);
      }
      return true;
    };

    $scope.customValid = function() {
      return $scope.validCardTotal() && 
             $scope.validHandCount() &&
             $scope.validHandCards() &&
             $scope.validInitials();
    };

    $scope.submit = function() {
      utils.setupNewGame($scope.players, $scope.cardSet.cards);

      for (var i in store.cards) {
        var card = store.cards[i];
        logic.addDeduction(store.players[0].name, card.name, card.inHand);
      }

      $location.url('overview');
    };

  }]);
})();
