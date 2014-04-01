'use strict';

angular.module('fbbirthday.birthdays')
  .controller('BirthdaysController', ['$scope', '$stateParams', '$location', 'Global', 'Birthdays','$window',

  function($scope, $stateParams, $location, Global, Birthdays, $window){
    $scope.global = Global;
    $scope.limitct = 10;

    $scope.find = function(query) {
        Birthdays.query(query, function(birthdays){
          $scope.birthdays = birthdays
        })
      }

    $scope.isToday = function(birthday){
      var today = new Date()
      today.setYear(0);
      var temp = new Date(birthday);
      temp.setYear(0)

      return today.toDateString() == temp.toDateString();
    };

    $scope.noImage = "img/No-Image.png"

    $scope.hasBirthday = function(birthday){
      if (birthday) {
        return true
      } else {
        return false
      }

    };

    $scope.friends = $window.friends;
    $scope.friend = $window.friend;

    $scope.thisWeek = function(birthday) {
      var today = new Date();
      today.setYear(0)
      var temp = new Date(birthday)
      temp.setYear(0)
      if (dateDiffInDays(today, temp) < 7 && dateDiffInDays(today, temp) > 0) {
        return true
      } else {
        return false
      }
    };

    $scope.thisMonth = function(birthday) {
      var today = new Date();
      today.setYear(0)
      var today_date = today.getDate()
      var temp = new Date(birthday)
      temp.setYear(0)
      if (today.getMonth() === temp.getMonth() && dateDiffInDays(today,temp) > 0) {
        return true
      } else {
       return  false
      }
    };

  } ])


var _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
