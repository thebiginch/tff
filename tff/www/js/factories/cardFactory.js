app.factory('cardFactory', function($http) {
  return {
    getNewCards: function() {
      return $http.get('/api/users')
      .then(function(users) {
        return users
      })
    }
  }
})
