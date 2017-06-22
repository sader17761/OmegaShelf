var app = angular.module('myApp', ['ngRoute']); //

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "views/partials/logIn.html",
        controller: "ShelfController as sc"
    }).when('/register', {
        templateUrl: "views/partials/register.html",
        controller: "ShelfController as sc"
    }).when('/loggedIn', {
        templateUrl: "views/partials/loggedIn.html",
        controller: "ShelfController as sc"
    });
});

app.controller('ShelfController', ShelfController);

function ShelfController($location) {
    var vm = this;
    console.log('NG is here');

    vm.go = function(path) {
        $location.path(path);
    };

}
