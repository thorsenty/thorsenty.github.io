(function(window, angular, undefined) {
  angular.module('thorsent', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'LandingCtrl',
          templateUrl: '/planning-poker/landing.html'
        })
        .when('/:roomId/', {
          controller: 'RoomCtrl',
          templateUrl: '/planning-poker/room.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    }])

    .controller("LandingCtrl", ["$scope", "$location", function($scope, $location) {
      $scope.joinRoom = function() {
        $location.path("/"+$scope.roomId);
      };

      $scope.newRoom = function() {
        $location.path("/"+randomRoomId());
      };
    }])

    .controller("RoomCtrl", ["$scope", "$routeParams", function($scope, $routeParams) {
      $scope.roomId = $routeParams.roomId;
    }]);

  function randomRoomId() {
    return Math.floor((Math.random() * 900000) + 100000);
  }
})(window, window.angular);