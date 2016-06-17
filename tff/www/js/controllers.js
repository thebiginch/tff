angular.module('app.controllers', ['app.factories', 'ionic', 'fsaPreBuilt'])

.controller('fightTabDefaultPageCtrl', function($scope, $http, fightFactory, $ionicModal) {
  // // Commented out for testing
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


  $scope.cardSwipedRight = function(otherPerson) {
    fightFactory.cardSwipedRight(otherPerson)
    .then(function(match) {
      $scope.match = match;
      if(match.name) $scope.openModal()
    })
  }

  //Match Made Popup
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    // console.log(modal.$scope)
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

.controller('chatTabDefaultPageCtrl', function($scope) {

})

.controller('settingsTabDefaultPageCtrl', function($scope) {

})

.controller('loginCtrl', function($scope,AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
          $state.go('tabsController.fightTabDefaultPage');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };
})





.controller('matchesTabDefaultPageCtrl', function($scope) {

})
