'use strict';

angular.module('fbbirthday.birthdays').factory('Birthdays', ['$resource',
  function($resource) {
    return $resource('birthdays/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
    });
}]);
