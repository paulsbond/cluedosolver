(function(){
  var app = angular.module('app');

  app.controller('OverviewController', 
  ['$scope', 'store', 'logic',
  function($scope, store, logic) {

    $scope.store = store;
    $scope.logic = logic;
    
    $scope.cardCategory = function(card) {
      if (logic.isOwned(card.name)) return "owned";
      if (logic.isAnswer(card.name)) return "answer";
    };

    $scope.icon = function(player, card) {
      var hasCard = logic.hasCard(player.name, card.name);
      if (hasCard === true) return "fa fa-check";
      if (hasCard === false) return "fa fa-times";
      if (logic.possibilityExists(player.name, card.name))
        return "fa fa-question";
      return "";
    };

  }]);
})();
