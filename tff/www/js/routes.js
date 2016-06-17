angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.fightTabDefaultPage', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/fightTabDefaultPage.html',
        controller: 'fightTabDefaultPageCtrl'
      }
    }
  })

  .state('chatTabDefaultPage', {
    url: '/page3',
    templateUrl: 'templates/chatTabDefaultPage.html',
    controller: 'chatTabDefaultPageCtrl'
  })

  .state('tabsController.settingsTabDefaultPage', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/settingsTabDefaultPage.html',
        controller: 'settingsTabDefaultPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.login', {
    url: '/page5',
    views: {
      'tab4': {
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
      }
    }
  })

  .state('tabsController.matchesTabDefaultPage', {
    url: '/page6',
    views: {
      'tab2': {
        templateUrl: 'templates/matchesTabDefaultPage.html',
        controller: 'matchesTabDefaultPageCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page2')



});
