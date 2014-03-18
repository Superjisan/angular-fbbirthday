'use strict';

angular.module('fbbirthday.messages').factory('Messages', ['$resource',
  function($resource) {
    return $resource('schedules/:messageId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
    });
}]);
