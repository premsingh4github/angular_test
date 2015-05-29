app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/AddNewOrder', {
        templateUrl: 'templates/add_order.html',
        controller: 'AddOrderController'
    }).
     when('/ShowOrders', {
        templateUrl: 'templates/show_orders.html',
        controller: 'ShowOrdersController'
     }).
     when('/login',{
     	templateUrl:'templates/login.html',
     	controller:'loginController'
     })
     otherwise({
        redirectTo: '/login'
      });
}]);
