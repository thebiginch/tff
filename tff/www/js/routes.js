angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

       .state('login', {
           url: '/page1',
           templateUrl: 'templates/login.html',
           controller: 'loginCtrl',
       })
       .state('tabsController', {
           url: '/page2',
           templateUrl: 'templates/tabsController.html',
           abstract: true
       })
       .state('tabsController.fightTabDefaultPage', {
           url: '/page3',
           views: {
               'tab1': {
                   templateUrl: 'templates/fightTabDefaultPage.html',
                   controller: 'fightTabDefaultPageCtrl'
               }
           }
       })
       .state('tabsController.matchesTabDefaultPage', {
           url: '/page4',
           views: {
               'tab2': {
                   templateUrl: 'templates/matchesTabDefaultPage.html',
                   controller: 'matchesTabDefaultPageCtrl',
                   resolve: {
                     matchedUsers: function($http) {
                       return $http.get('/api/users/matches')
                       .then(matches => matches.data)
                       }
                     }
                   }
               }
       })
       .state('tabsController.settingsTabDefaultPage', {
           url: '/page5',
           views: {
               'tab3': {
                   templateUrl: 'templates/settingsTabDefaultPage.html',
                   controller: 'settingsTabDefaultPageCtrl'
               },
           }
       })

       $urlRouterProvider.otherwise('/page1')



});
