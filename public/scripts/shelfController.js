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
    vm.users = [];
    var effect = document.createElement('audio');
    effect.autoplay = false;

    vm.getUsernames = function() {
      ShelfService.getUsernames().then(function(response) {
        if (vm.name) {
          vm.users = [];
          console.log('response.data is:', response);
          for (var i = 0; i < response.data.length; i++) {
            vm.users.push(response.data[i]);
          }
        }
      });
    };

    function soundEffect( src ) {
      effect.src = src;
        effect.play();
    }
    console.log('NG is here');

    vm.go = function(path) {
        if (path == '/loggedIn') {
            soundEffect('/media/loggedin.m4a');
            $location.path(path);
        } else {
            soundEffect('/media/click.m4a');
            $location.path(path);
        }
    };

    vm.registerUser = function() {
        console.log('vm.registerUser clicked!');
        if (vm.inputed.password !== vm.inputed.password2) {
            swal("Whoops!", "passwords don't match!", "error");
            soundEffect('/media/uhoh.m4a');
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
                  soundEffect('/media/uhoh.m4a');
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
            if (response.data == 'we got it') {
                vm.go('/loggedIn');
                vm.name = credentials.username;
                console.log(vm.name, credentials.username);

                vm.inputed.username = '';
                vm.inputed.password = '';
                // vm.inputed = '';
                vm.displayItems();
            } else {
              swal("Whoah there!", "Check yer info, friendo", "error");
              soundEffect('/media/uhoh.m4a');
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

            ShelfService.postItem(itemToSend).then(function(response){
              vm.inputed.descIn = '';
              vm.inputed.imageURLin = '';
              vm.displayItems();
              soundEffect('/media/click.m4a');
            });
          } else {
            soundEffect('/media/uhoh.m4a');
            swal("LOG IN FOOL", "You need to be logged in to post", "error");
        }
    };

    vm.displayItems = function() {
        ShelfService.getItems().then(function(response) {
            console.log('response is: ', response);
            vm.shelfArray = response.data;
            vm.getUsernames();
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
                    soundEffect('/media/destroy.m4a');
                } else {
                    swal("Cancelled", "Your shelf is safe :)", "error");
                }
            });

    };
}
