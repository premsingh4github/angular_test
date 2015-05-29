var app = angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $modal) {




  $scope.open = function (size) {

    var modalInstance = $modal.open({
     
      template: '<h1>modal again</h1>',
    
      size: size,
      
    });

   
  };



});



