(function() {
  var app = angular.module('app');

  app.factory('utils', ['store', function(store) {

    var utils = {};

    utils.getPlayerIndex = function(name) {
      var i = 0;
      while (name !== store.players[i].name) i++;
      return i;
    }

    utils.getNextPlayer = function(name) {
      var i = utils.getPlayerIndex(name) + 1;
      if (i === store.players.length) i = 0;
      return store.players[i].name;
    }

    utils.setupNewGame = function(players, cards) {
      store.$reset();
      store.players = players;
      store.cards = cards;
      store.turns = [];
      store.turn = utils.getFirstTurn();
      store.deductions = [];
      store.possibilities = [];
    };

    utils.getPlayer = function(name) {
      for (var i in store.players) {
        var player = store.players[i];
        if (player.name === name) {
          return player;
        }
      }
      return null;
    };

    utils.getCard = function(name) {
      for (var i in store.cards) {
        var card = store.cards[i];
        if (card.name === name) {
          return card;
        }
      }
      return null;
    };

    utils.getDeduction = function(playerName, cardName) {
      for (var i in store.deductions) {
        var deduction = store.deductions[i];
        if (deduction.player === playerName && deduction.card === cardName) {
          return deduction;
        }
      }
      return null;
    };

    utils.dataExists = function() {
      return store.players !== undefined;
    };

    utils.getFirstTurn = function() {
      var turn = {};
      turn.player = store.players[0].name;
      turn.suspect = store.cards[0].name;
      turn.weapon = store.cards[6].name;
      turn.location = store.cards[12].name;
      return turn;
    }

    utils.getNextTurn = function() {
      var lastTurn = store.turns[store.turns.length - 1];
      var turn = {};
      turn.player = utils.getNextPlayer(lastTurn.player);
      turn.suspect = lastTurn.suspect;
      turn.weapon = lastTurn.weapon;
      turn.location = lastTurn.location;
      return turn;
    }

    return utils;
  }]);
})();
