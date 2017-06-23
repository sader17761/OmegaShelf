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
    vm.shelfArray = [];
var effect = document.createElement('audio');
effect.autoplay = false;

function soundEffect(){
  effect.play();
}
    console.log('NG is here');

    vm.go = function(path) {
      if(path == '/loggedIn'){
      effect.src = '/media/loggedin.m4a';
      soundEffect();
        $location.path(path);
      } else {
        effect.src = '/media/click.m4a';
        soundEffect();
          $location.path(path);
      }
    };

    vm.registerUser = function() {
        console.log('vm.registerUser clicked!');
        if (vm.inputed.password !== vm.inputed.password2) {
            alert("passwords don't match!");
        } else {
            var credentials = {
                username: vm.inputed.username,
                password: vm.inputed.password
            };
            ShelfService.postRegister(credentials).then(function(response) {
                if (response.status == 201) {
                    vm.go('/');
                    vm.inputed.username = '';
                    vm.inputed.password = '';
                    vm.inputed.password2 = '';
                } else {

                }
            });
        }
    };
    vm.loginUser = function() {
        console.log('vm.registerUser clicked!');
        var credentials = {
            username: vm.inputed.username,
            password: vm.inputed.password
        };
        ShelfService.postLogin(credentials).then(function(response) {
            if (response.status == 200) {
              vm.go('/loggedIn');
                vm.name = credentials.username;
                console.log(vm.name, credentials.username);

                vm.inputed.username = '';
                vm.inputed.password = '';
                // vm.inputed = '';
            } else {

            }
        });
    };
    vm.logOut = function() {
        vm.name = '';
        vm.go('/');
    };

    vm.shelveItem = function() {
        if (vm.name) {
            var itemToSend = {
                description: vm.inputed.descIn,
                placer: vm.name,
                imageUrl: vm.inputed.imageURLin
            };

            ShelfService.postItem(itemToSend);
            vm.displayItems();
        } else {
          effect.src = '/media/uhoh.m4a';
          soundEffect();
          swal("LOG IN FOOL", "You need to be logged in to post", "error");
        }
    };

    vm.displayItems = function() {
        ShelfService.getItems().then(function(response) {
            console.log('response is: ', response);
            vm.shelfArray = response.data;
        });
    };
    vm.destroy = function(id) {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this shelf item!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#8D0801",
                confirmButtonText: "Yes, DESTROY it!",
                cancelButtonText: "No, I like my shelf as is!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    console.log(id);
                    ShelfService.deleteItem(id).then(function(response) {
                        console.log('response is: ', response);
                        vm.displayItems();
                    });
                    swal("Destroyed!", "Your shelf item has been deleted.", "success");
                    effect.src= '/media/destroy.m4a';
                    soundEffect();
                } else {
                    swal("Cancelled", "Your shelf is safe :)", "error");
                }
            });

    };
}
