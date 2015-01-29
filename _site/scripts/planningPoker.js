(function(window, angular, undefined) {

  var firebase = new Firebase("https://sweltering-torch-73.firebaseio.com/");
  var CardDecks = [
    {
      name: "Mountain Goat",
      cards: [
        {
          text: "0",
          val: 0
        },
        {
          text: "1/2",
          val: 0.5
        },
        {
          text: "1",
          val: 1
        },
        {
          text: "2",
          val: 2
        },
        {
          text: "3",
          val: 3
        },
        {
          text: "5",
          val: 5
        },
        {
          text: "8",
          val: 8
        },
        {
          text: "13",
          val: 13
        },
        {
          text: "20",
          val: 20
        },
        {
          text: "40",
          val: 40
        },
        {
          text: "100",
          val: 100
        },
        {
          text: "?",
          val: -1
        },
        {
          text: "Cafe",
          val: -1
        }
      ]
    },
    {
      name: "Fibonacci",
      cards: [
        {
          text: "0",
          val: 0
        },
        {
          text: "1",
          val: 1
        },
        {
          text: "2",
          val: 2
        },
        {
          text: "3",
          val: 3
        },
        {
          text: "5",
          val: 5
        },
        {
          text: "8",
          val: 8
        },
        {
          text: "13",
          val: 13
        },
        {
          text: "21",
          val: 21
        },
        {
          text: "34",
          val: 34
        },
        {
          text: "55",
          val: 55
        },
        {
          text: "89",
          val: 89
        },
        {
          text: "?",
          val: -1
        }
      ]
    },
    {
      name: "Sequential",
      cards: [
        {
          text: "0",
          val: 0
        },
        {
          text: "1",
          val: 1
        },
        {
          text: "2",
          val: 2
        },
        {
          text: "3",
          val: 3
        },
        {
          text: "4",
          val: 4
        },
        {
          text: "5",
          val: 5
        },
        {
          text: "6",
          val: 6
        },
        {
          text: "7",
          val: 7
        },
        {
          text: "8",
          val: 8
        },
        {
          text: "9",
          val: 9
        },
        {
          text: "10",
          val: 10
        },
        {
          text: "?",
          val: -1
        }
      ]
    },
    {
      name: "T-Shirt",
      cards: [
        {
          text: "XS",
          val: 1
        },
        {
          text: "S",
          val: 2
        },
        {
          text: "M",
          val: 3
        },
        {
          text: "L",
          val: 4
        },
        {
          text: "XL",
          val: 5
        },
        {
          text: "?",
          val: -1
        }
      ]
    }
  ];

  angular.module('thorsent', ['ngRoute', 'ngMaterial', 'firebase'])

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

    .factory('RoomHelper', ['$q', '$firebase', function($q, $firebase) {
      return {
        checkIfRoomExists: function(roomId) {
          var deferred = $q.defer();

          firebase.child('rooms').child(roomId).once('value', function(snapshot) {
            exists = (snapshot.val() !== null);
            deferred.resolve(exists);
          });

          return deferred.promise;
        },

        generateRoomId: function() {
          return Math.floor((Math.random() * 99900000) + 100000).toString();
        },

        generateUserId: function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
        },

        getRoom: function(roomId) {
          var ref = firebase.child('rooms').child(roomId);
          return $firebase(ref).$asObject();
        }
      };
    }])

    .controller("LandingCtrl", ["$scope", "$location", "$firebase", "RoomHelper", function($scope, $location, $firebase, RoomHelper) {
      
      $scope.joinRoom = function() {
        $location.path("/"+$scope.roomId);
      };

      $scope.newRoom = function() {
        var newRoomId = RoomHelper.generateRoomId();
        var $fb_newRoom = $firebase(firebase.child('rooms').child(newRoomId));
        var user = {
          leader: true,
          uuid: RoomHelper.generateUserId(),
          voter: true
        };
        $fb_newRoom.$set({users: [user]});
        $location.path("/"+newRoomId);
      };
    }])

    .controller("RoomCtrl", ["$scope", "$routeParams", "$location", "RoomHelper", function($scope, $routeParams, $location, RoomHelper) {
      
      $scope.changeDeck = function() {
        $scope.selectedDeck = CardDecks[$scope.selectedDeckIndex].cards;
      };

      var roomId = $routeParams.roomId;
      RoomHelper.checkIfRoomExists(roomId).then(function(exists) {
        if (exists) {
          $scope.room = RoomHelper.getRoom(roomId);
          $scope.cardDecks = CardDecks;
          $scope.selectedDeckIndex = 0;
          $scope.selectedDeck = CardDecks[$scope.selectedDeckIndex].cards;
        } else {
          $location.path("/");
        }
      });
    }]);

  function checkIfRoomExists(roomId) {
    var exists = false;
    return firebase.child('rooms').child(roomId).once('value', function(snapshot) {
      exists = (snapshot.val() !== null);
    });
  }

})(window, window.angular);
