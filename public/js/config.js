'use strict';

//Setting up route
angular.module('fbbirthday').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('export bday data', {
        url: '/birthday/data',
        templateUrl: 'views/birthdays/list.html'
    })
      .state('all birthdates', {
        url:'/birthdays',
        templateUrl: 'views/birthdays/list.html'
      })
      .state('friend b-day by id', {
        url: '/birthday/:friend_id',
        templateUrl: 'views/birthdays/view.html'
      })
      .state('all articles', {
        url: '/articles',
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: 'views/articles/edit.html'
    })
      .state('article by id', {
        url: '/articles/:articleId',
        templateUrl: 'views/articles/view.html'
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
