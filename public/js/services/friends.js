'use strict';

angular.module('fbbirthday.birthdays').factory('Friends', ['$resource',
  function($resource) {
    return $resource('birthdays/friends/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
    });
}]);
