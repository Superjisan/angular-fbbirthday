'use strict';

//Setting up route
angular.module('fbbirthday').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
        .state('friend birthday age', {
          url: '/birthdays/friends/:facebookid',
          templateUrl: 'views/birthdays/friend.html'
        })
        .state('birthdays this month', {
          url: '/birthdays/this_month',
          templateUrl: 'views/birthdays/this_month.html'
        })
        .state('birthdays this week',{
          url: '/birthdays/this_week',
          templateUrl: 'views/birthdays/this_week.html'
        })
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
