var app = angular.module('myApp', ['ngRoute']); //

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "views/partials/logIn.html",
        controller: "ShelfController"
    }).when('/register', {
        templateUrl: "views/partials/register.html",
        controller: "ShelfController"
    }).when('/loggedIn', {
        templateUrl: "views/partials/loggedIn.html",
        controller: "ShelfController"
    });
});

app.controller('ShelfController', ShelfController);

function ShelfController(ShelfService, $location) {
    var vm = this;

    console.log('NG is here');

    vm.go = function(path) {
        $location.path(path);
    };

    vm.registerUser = function() {
      console.log('vm.registerUser clicked!');
        if (vm.password !== vm.password2) {
            alert("passwords don't match!");
        } else {
            var credentials = {
                username: vm.username,
                password: vm.password
            };
            ShelfService.postRegister( credentials );
        }
    };
}
