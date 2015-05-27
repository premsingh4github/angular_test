var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap']);
myApp.controller('ModalDemoCtrl', function($scope, $modal) {
	$scope.open = function(size) {
		var modalInstance = $modal.open({
			template: '<h1>modal again</h1>',
			size: size,
		});
	};
});
myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/state2");
	//
	// Now set up the states
	$stateProvider
		.state('state1', {
			url: "/state1",
			templateUrl: "templates/login.html",
			controller:"loginController"

		}).state('state2', {
			url: "/state2",
			templateUrl: "templates/login1.html",
			controller: "login1Controller"
		});
});
myApp.directive('showErrors', function($timeout) {
    return {
      restrict: 'A',
      require: '^form',
      link: function (scope, el, attrs, formCtrl) {
        // find the text box element, which has the 'name' attribute
        var inputEl   = el[0].querySelector("[name]");
        // convert the native text box element to an angular element
        var inputNgEl = angular.element(inputEl);
        // get the name on the text box
        var inputName = inputNgEl.attr('name');
        
        // only apply the has-error class after the user leaves the text box
        inputNgEl.bind('blur', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });
        
        scope.$on('show-errors-check-validity', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });
        
        scope.$on('show-errors-reset', function() {
          $timeout(function() {
            el.removeClass('has-error');
          }, 0, false);
        });
      }
    }
  });