var myApp = angular.module('myApp', ['ui.router','ui.bootstrap']);
myApp.controller('ModalDemoCtrl', function ($scope, $modal) {
  $scope.open = function (size) {
    var modalInstance = $modal.open({     
      template: '<h1>modal again</h1>',    
      size: size,      
    });
  };
});
myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});



