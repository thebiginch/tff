angular.module('app.factories', ['ionic'])

.factory('fightFactory', function($http, $ionicPopover) {
  return {
    getNewCards: function() {
      return $http.get('/api/users/challengers').then((users) => users.data)
    },
    cardSwipedRight: function(otherPerson) {
      return $http.post('/api/matches',{personId: otherPerson.id, IR: true})
      .then((resp) => resp.data)
      // .then((data) => )
    },
    cardSwipedLeft: function(otherPerson) {
      return $http.post('/api/matches',{personId: otherPerson.id, IR: false}).then((resp) => resp.data)
    },

  }
})
