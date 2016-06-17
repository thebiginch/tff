angular.module('app.factories', [])

.factory('fightFactory', function($http) {
  return {
    getNewCards: function() {
      return $http.get('/api/users').then((users) => users.data)
    },
    cardSwipedRight: function(otherPerson) {
      return $http.post('/api/matches',{userId: 60, personId: otherPerson.id, IR: true}).then((resp) => resp.data)
    },
    cardSwipedLeft: function(otherPerson) {
      return $http.post('/api/matches',{userId: 50, personId: otherPerson.id, IR: false}).then((resp) => resp.data)
    }
  }
})
.factory('loginFactory',function($http){

  return {
    login: function(username,password){
      $http.post('/api/login',{username: us})

    }
  }

})
