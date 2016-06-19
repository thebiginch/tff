angular.module('app.controllers', ['app.factories', 'ionic', 'fsaPreBuilt', 'app.services'])

.controller('fightTabDefaultPageCtrl', function($scope, $http, fightFactory, $ionicModal) {
    // // Commented out for testing
    $scope.getNewCards = function() {
        fightFactory.getNewCards().then(cards => $scope.cards = cards)
    }

    $scope.appendNewCards = function() {
      fightFactory.getNewCards().then(cards => $scope.cards = cards.concat($scope.cards))
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
        if ($scope.cards.length < 10) {
          $scope.appendNewCards()
        }
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
                if (match.name) $scope.openModal()
                if ($scope.cards.length === 0) {
                  console.log('got here')
                  $scope.getNewCards()
                }
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

.controller('chatTabDefaultPageCtrl', function($scope, $timeout, $ionicScrollDelegate) {

  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

})

.controller('settingsTabDefaultPageCtrl', function($scope, $state, AuthService, $localStorage,config) {


    $scope.user = $localStorage.user;

    $scope.settings = {

            location: $scope.user.location,
            minWeight: 100,
            maxWeight: 200,
            minAge: 18,
            maxAge: 65,
            minDist: 0,
            maxDist: 100,
            searchRadius: 100,
            options: {
                hidePointerLabels: true,
                hideLimitLabels: true,
                showSelectionBar: true,
            }

        },

    $scope.sendLogout = function() {

            $scope.error = null;

            AuthService.logout().then(function() {
                $state.go('login');
            }).catch(function() {
                $scope.error = 'Something bad.';
            });
        };

    $scope.deleteAccount = function() {

        $scope.error = null;

        $http.delete(config.apiUrl+'/api/users').then(function() {
            $state.go('login');
        }).catch(function() {
            $scope.error = 'Something bad.';
        });
    };

})

.controller('loginCtrl', function($scope, AuthService, $state, $http, $localStorage, $sessionStorage, Session) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function(loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function() {


            $localStorage.user = Session.user;

            $state.go('tabsController.fightTabDefaultPage');


        }).catch(function() {
            $scope.error = 'Invalid login credentials.';
        });
    };


})

.controller('matchesTabDefaultPageCtrl', function($scope, matchedUsers, $ionicModal, $state) {
  $scope.matchedUsers = matchedUsers

  $scope.newChat = function(user) {
    $scope.chats.unshift(user)
    $scope.modal.hide()
  }

  $scope.goToChat = function(user) {
    $state.go('chatTabDefaultPage')
  }

  $scope.chats = [];

  //Profile view Popup
  $ionicModal.fromTemplateUrl('view-profile.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
      // console.log(modal.$scope)
  });
  $scope.openModal = function(user) {
      $scope.user = user
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
