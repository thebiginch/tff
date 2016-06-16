angular.module('app.controllers', [])

.controller('fightTabDefaultPageCtrl', function($scope) {
  $scope.cards = [
    {image: 'img/TvTxmF70SounKc1nTzZG_17.jpg'},
    {image: 'https://randomuser.me/api/portraits/men/23.jpg' }
  ];

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.cardSwiped = function(index) {
    var newCard = // new card data
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
