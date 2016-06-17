angular.module('app.factories', [])

.factory('fightFactory', function($http) {
  return {
    getNewCards: function() {
      return $http.get('/api/users')
      .then(users => $scope.cards = users.data)
    }
  }
})
