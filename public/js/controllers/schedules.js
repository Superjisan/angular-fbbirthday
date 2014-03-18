'use strct';

angular.module('fbbirthday.messages')
  .controller('MessagesController', ['$scope', '$stateParams', 'Global', '$location', 'Messages',
    function($scope, $stateParams, Global, $location, Messages) {

      $scope.global = Global;

      $scope.populateBirthdays = function(query){
        Birthdays.query(function(birthdays){
          $scope.birthdays = birthdays;
        })
      };

       $scope.find = function(query) {
        Messages.query(query, function(messages){
          $scope.messages = messages
        })
      }


    }
    ])
