'use strict';

//Setting up route
angular.module('fbbirthday').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
        .state('scheduled messages', {
          url: '/schedules',
          templateUrl: 'views/schedules/list.html'
        })
        .state('facebook chat', {
          url: '/fbchat',
          templateUrl: 'views/index.html'
      })
      .state('export bday data', {
        url: '/birthdays/data',
        templateUrl: 'views/birthdays/list.html'
    })
      .state('all birthdates', {
        url:'/birthdays',
        templateUrl: 'views/birthdays/list.html'
      })
      .state('friend b-day today', {
        url: '/birthdays/today',
        templateUrl: 'views/birthdays/dayselect.html'
      })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('fbbirthday').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
