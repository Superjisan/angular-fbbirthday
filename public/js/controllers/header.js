'use strict';

angular.module('fbbirthday.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': "Today's Birthday",
        'link': 'birthdays/today'
    },
        {
          'title': 'All Birthdays',
          'link' : 'birthdays'
        },
        {
            'title' : 'Messages Scheduled',
            'link' : 'schedules'
        }];

    $scope.isCollapsed = false;
}]);
