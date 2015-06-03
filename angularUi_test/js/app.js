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
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "templates/login.html",
      controller: "loginController"

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
    link: function(scope, el, attrs, formCtrl) {
      // find the text box element, which has the 'name' attribute
      var inputEl = el[0].querySelector("[name]");
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
// added to support jwt authentication
function authInterceptor(API, auth) {
  
  return {
    // automatically attach Authorization header
    request: function(config) {
      var token = auth.getToken();
      if (config.url.indexOf(API) === 0 && token) {
        config.headers.AuthorizationJWT = 'Bearer ' + token;
      }

      return config;
    },

    // If a token was sent back, save it
    response: function(res) {
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        console.log('here')
        auth.saveToken(res.data.token);
      }

      return res;
    },
  }
}

function authService($window) {
 
  var self = this;

  // Add JWT methods here
  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  }

  self.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['jwtToken'];
  }

  self.isAuthed = function() {
    var token = self.getToken();
    if (token) {
      var params = self.parseJwt(token);
      return Math.round(new Date().getTime() / 1000) <= params.exp;
    } else {
      return false;
    }
  }

  self.logout = function() {
    $window.localStorage.removeItem('jwtToken');
  }
}

function userService($http, API, auth) {

  var self = this;
  self.getQuote = function() {
    return $http.post(API + '/getUser');
  }

  // add authentication methods here
  self.register = function(username, password) {
    return $http.post(API + 'signup', {
        email: username,
        password: password
      })
      .then(function(res) {
        auth.saveToken(res.data.token);
        return res;
      })
  }

  self.login = function(username, password) {
    return $http.get(API + 'login?email=' +username + '&password=' + password);
  }
}

myApp.factory('authInterceptor', authInterceptor);
myApp.service('user', userService)
myApp.service('auth', authService)
myApp.constant('API', 'http://localhost/tymondesign/public/')
myApp.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
