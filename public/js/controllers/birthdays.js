'use strict';

angular.module('fbbirthday.birthdays')
  .controller('BirthdaysController', ['$scope', '$stateParams', '$location', 'Global', 'Birthdays',

  function($scope, $stateParams, $location, Global, Birthdays){
    $scope.global = Global;
    $scope.limitct = 5;

    $scope.find = function(query) {
        Birthdays.query(query, function(birthdays){
          $scope.birthdays = birthdays
        })
      }

    $scope.findOne = function(){
        Birthdays.get({birthdayId: $stateParams.userId}, function(birthday){
            $scope.birthday = birthday;
        })
      };

    $scope.isToday = function(birthday){
      var today = new Date()
      today.setYear(0);
      var temp = new Date(birthday);
      temp.setYear(0)

      return today.toDateString() == temp.toDateString();
    }

  } ])

