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

myApp.controller('loginController', MainCtrl);
function MainCtrl($scope,user, auth) {  
  
  function handleRequest(res) {
    var token = res.data ? res.data.token : null;
    if(token) { console.log('JWT:', token); }
    $scope.message = res.data.message;
  
  }

  $scope.register = function(){
    user.register($scope.user.name, $scope.user.password)
      .then(handleRequest, handleRequest)
    alert("register");
  };
  $scope.login = function() {
  	console.log(auth);
    user.login($scope.user.name, $scope.user.password)
      .then(handleRequest, handleRequest)
      console.log(auth);
      $scope.token = localStorage.jwtToken;
      debugger;
  };
  // $scope.token = function(){
  //   return (localStorage.jwtToken == undefined)? false : true ;
  // };
  $scope.token = localStorage.jwtToken;
  $scope.logout = function(){
    delete localStorage.jwtToken;
    debugger;
  }
  $scope.request = function(){
    debugger;
    user.getQuote()
      .then(handleRequest, handleRequest)
  }
}
