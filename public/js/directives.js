'use strict';

window.angular.module('fbbirthday.directives', [])
  .directive('searchlimit', function(){
    return {restrict: "E",
      templateUrl:
      "views/birthday/searchlimitselect.html"
    };
  })
