angular.module('app.controllers', ['app.factories'])

.controller('fightTabDefaultPageCtrl', function($scope, $http, fightFactory) {
  $scope.getNewCards = fightFactory.getNewCards
  $scope.getNewCards()
  $scope.cards = [];

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.cardSwiped = function(index) {
    var newCard; // new card data
    $scope.cards.push(newCard);
  };
})

.controller('chatTabDefaultPageCtrl', function($scope) {

})

.controller('settingsTabDefaultPageCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('matchesTabDefaultPageCtrl', function($scope) {

})
