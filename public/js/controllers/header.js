'use strict';

angular.module('fbbirthday.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Birthdays',
        'link': 'birthdays'
    }];

    $scope.isCollapsed = false;
}]);
