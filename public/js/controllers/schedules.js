'use strct';

angular.module('fbbirthday.messages')
  .controller('MessagesController', ['$scope', '$stateParams', 'Global', '$location', '$window',
    function($scope, $stateParams, Global, $location, $window) {

      $scope.global = Global;
      $scope.messages = $window.messages;

      $scope.populateBirthdays = function(query){
        Birthdays.query(function(birthdays){
          $scope.birthdays = birthdays;
        })
      };

    }
    ])
