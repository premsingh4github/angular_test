myApp.controller('login1Controller', function($scope) {
	$scope.save = function() {
		$scope.$broadcast('show-errors-check-validity');

		if ($scope.userForm.$valid) {
			alert('User saved');
			$scope.reset();
		} else {
			alert("There are invalid fields");
		}
	};

	$scope.reset = function() {
		$scope.$broadcast('show-errors-reset');
		$scope.user = {
			name: '',
			password: ''
		};
	}
});
myApp.controller('loginController', function($scope) {
	$scope.login = function() {
		$scope.$broadcast('show-errors-check-validity');

		if ($scope.userForm.$valid) {
			alert('User login');			
			//$scope.reset();
		} else {
			alert("There are invalid fields");
		}
	};
	$scope.reset = function() {
		//$scope.$broadcast('show-errors-reset');
		$scope.user = {
			name: '',
			password: ''
		};
	}
	
});

