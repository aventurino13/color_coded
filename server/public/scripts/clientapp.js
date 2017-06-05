var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    templateUrl: '/views/login.html',
    controller: "LoginController as lc",
  }).when('/register', {
    templateUrl: '/views/register.html',
    controller: "LoginController as lc"
  }).when('/home', {
    templateUrl:'views/home.html',
    controller: 'UserController as uc'
  }).when('/add', {
    templateUrl: 'views/add.html',
    controller: 'UserController as uc'
  }).when('/arch', {
    templateUrl: 'views/arch.html',
    controller: 'viewsController as uc'
  }).when('/dsgn', {
    templateUrl: 'views/dsgn.html',
    controller: 'viewsController as uc'
  }).when('/art', {
    templateUrl: 'views/art.html',
    controller: 'viewsController as uc'
  }).when('/search', {
    templateUrl: 'views/search.html',
    controller: 'searchController as uc'
  }).otherwise('/');

    $locationProvider.html5Mode(true);

});//end ang-route config

myApp.controller('UserController', function($http, $location, postService, getService) {
  var vm = this;

  // Upon load, check this user's session on the server
$http.get('/user').then(function(response) {
    if(response.data.username) {
        // user has a curret session on the server
        vm.userName = response.data.username;
        console.log('User Data: ', vm.userName);
        vm.getUserItems();
        return vm.userName;
    } else {
        // user has no session, bounce them back to the login page
        $location.path("/");
    }
});

vm.logout = function() {
  $http.get('/user/logout').then(function(response) {
    console.log('logged out');
    $location.path("/login");
  });
}

  vm.showPicker = function(){
    var client = filestack.init('ANxEyrmJzQsSnoC7PFCcXz');
    client.pick({
      accept: 'image/*',
      maxFiles: 5,
      storeTo: {
        location: 's3'
      }
    }).then(function(result) {
      console.log(result.filesUploaded[0]);
      vm.file = result.filesUploaded[0];
      console.log(vm.file.url);
      //console.log("result.filesUploaded", JSON.stringify(result.filesUploaded));
    });
  };


  vm.addItem = function(){
      var itemToSend = {
        imgURL: vm.file.url,
        title: vm.title,
        linkURL: vm.linkURL,
        type: vm.type,
        tags: [vm.tag1, vm.tag2, vm.tag3, vm.tag4, vm.tag5],
        user: vm.userName
        };
        console.log(itemToSend);
      postService.addItem(itemToSend);
    };//end add Item


    vm.getUserItems = function (){
      getService.userItems(vm.userName).then(function(data){
        console.log('in get user return', data);
        vm.archResult = [];
        vm.dsgnResult = [];
        vm.artResult = [];
        for (var i=0; i<data.length; i++){
          console.log("data[i].type-->", data[i].type);
          if ( data[i].type === "arch"){
            vm.archResult.push(data[i]);
          }
          if ( data[i].type === "dsgn"){
            vm.dsgnResult.push(data[i]);
          }
          if ( data[i].type === "art"){
            vm.artResult.push(data[i]);
          }
        }

      });

    };
          vm.deleteItem = function (id){
            getService.rmItem(id).then(function(data){
              console.log('in .then delte return', data);
                vm.getUserItems();
            });

          };
          vm.getUserItems();

          // vm.hoverIn = function(){
          //     vm.hoverEdit = true;
          // };
          //
          // vm.hoverOut = function(){
          //     vm.hoverEdit = false;
          // };
});

myApp.controller('viewsController', function(postService, getService) {

  var vm = this;

  vm.getArch = function (){
    getService.getItems("arch").then(function(data){
      console.log('in get all arch return', data);
      vm.allArch = data;
    });

  };

  vm.getDsgn = function (){
    getService.getItems("dsgn").then(function(data){
      console.log('in get all dsgn return', data);
      vm.allDsgn = data;
    });

  };

  vm.getArt = function (){
    getService.getItems("art").then(function(data){
      console.log('in get all art return', data);
      vm.allArt = data;
    });

  };

});


myApp.controller('LoginController', function($http, $location) {
  console.log('LoginController loaded');
    var vm = this;

    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      console.log('here', vm.user);
      if(vm.user.username == '' || vm.user.password == '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/home');
          } else {
            console.log('failure: ', response);
            vm.message = "Wrong!!";
          }
        });
      }
    }

    vm.registerUser = function() {
      if(vm.user.username == '' || vm.user.password == '') {
        vm.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          vm.message = "Please try again."
        });
      }
    }
});
