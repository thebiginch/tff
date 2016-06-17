angular.module('app.factories', ['ionic'])

.factory('fightFactory', function($http, $ionicPopover) {
  return {
    getNewCards: function() {
      return $http.get('/api/users').then((users) => users.data)
    },
    cardSwipedRight: function(otherPerson) {
      return $http.post('/api/matches',{userId: 1, personId: 3, IR: true})
      .then((resp) => resp.data)
      // .then((data) => )
    },
    cardSwipedLeft: function(otherPerson) {
      return $http.post('/api/matches',{userId: 50, personId: otherPerson.id, IR: false}).then((resp) => resp.data)
    },

  }
})
