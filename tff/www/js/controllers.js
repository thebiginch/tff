angular.module('app.controllers', ['app.factories'])

.controller('fightTabDefaultPageCtrl', function($scope, $http, fightFactory) {
  // Commented out for testing
  $scope.getNewCards = function() {
    fightFactory.getNewCards().then(cards => $scope.cards = cards )
  }

  $scope.getNewCards()

  $scope.cards = [];

  // $scope.cards = [{
  //   name: 'Zach',
  //   image: 'https://randomuser.me/api/portraits/men/90.jpg',
  //   email: 'z@z.com',
  //   password: '123',
  //   isAdmin: true,
  //   location: 12345,
  //   searchRadius: 50,
  //   weight: 150,
  //   minAge: 18,
  //   maxAge: 65
  // },{
  //   name: 'Andrew',
  //   image: 'https://randomuser.me/api/portraits/men/60.jpg',
  //   email: 'a@a.com',
  //   password: '123',
  //   isAdmin: true,
  //   location: 12345,
  //   searchRadius: 50,
  //   weight: 150,
  //   minAge: 18,
  //   maxAge: 65
  // }]

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.cardSwiped = function(index) {
    var newCard; // new card data
    $scope.cards.push(newCard);
  };

  $scope.cardSwipedLeft = fightFactory.cardSwipedLeft
  $scope.cardSwipedRight = fightFactory.cardSwipedRight
})

.controller('chatTabDefaultPageCtrl', function($scope) {

})

.controller('settingsTabDefaultPageCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('matchesTabDefaultPageCtrl', function($scope) {

})
