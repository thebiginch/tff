angular.module('app.controllers', [])

.controller('fightTabDefaultPageCtrl', function($scope, $http) {
  $scope.getNewCards = function() {
    return $http.get('http://192.168.3.223:1337/api/users')
    .then(function(users) {
      return users
    })
  }

  $scope.getNewCards()
  .then(function(newCards) {
    $scope.cards = newCards
  })


  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.cardSwiped = function(index) {
    var newCard
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
