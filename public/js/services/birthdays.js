'use strict';

angular.module('fbbirthday.birthdays').factory('Birthdays', ['$resource',
  function($resource) {
    return $resource('api/birthdays', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
    });
}]);
