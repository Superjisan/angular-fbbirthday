'use strct';

angular.module('fbbirthday.messages', [])
  .controller('MessagesController', ['Global','$scope', '$stateParams', '$location', 'Birthdays', 'Messages',
    function($scope, $stateParams, Global, $location, Birthdays, Messages) {

      $scope.global = Global;

      $scope.populateBirthdays = function(query){
        Birthdays.query(function(birthdays){
          $scope.birthdays = birthdays;
        })
      };

      $scope.create = function() {
        var message = new Messages({
          // message : this.message.message,
          sent: false,
          time_scheduled: this.message.time_to_send,
          // to_friend_name: this.friend_name,
          // to_friend_id : this.friend_id
        });

        messages.$save(function (response) {
          $location.path("schedules/" + response._id);
        });

        this.message = "";
        this.time_scheduled = "";
        this.friend_name = "";
        this.friend_id = "";

      };

    $scope.update = function() {
      var message = $scope.message;

      message.$update(function(){
        $location.path('schedules/' + message._id)
      })
    }

    $scope.findOne = function () {
        Messages.get({ messageId : $stateParams.messageId }, function (message) {
          $scope.message = message;
        });
      };

      $scope.remove = function (fantasyteam) {
        message.$remove();
        for (var i in $scope.messages) {
          if ($scope.messages[i] == messages) {
            $scope.messages.splice(i, 1)
          }
        }
      };
    }
    ])
