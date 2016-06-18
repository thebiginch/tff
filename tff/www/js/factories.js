angular.module('app.factories', ['ionic','app.services'])

.factory('fightFactory', function($http, $ionicPopover, config) {
  return {
    getNewCards: function() {
      return $http.get(config.apiUrl+'/api/users/challengers').then((users) => users.data)
    },
    cardSwipedRight: function(otherPerson) {
      return $http.post(config.apiUrl+'/api/matches',{personId: otherPerson.id, IR: true})
      .then((resp) => resp.data)
      // .then((data) => )
    },
    cardSwipedLeft: function(otherPerson) {
      return $http.post(config.apiUrl+'/api/matches',{personId: otherPerson.id, IR: false}).then((resp) => resp.data)
    },

  }
})
