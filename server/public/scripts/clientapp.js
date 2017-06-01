var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
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
  }).otherwise('/');

    $locationProvider.html5Mode(true);

});//end ang-route config

myApp.controller('UserController', function(postService, getService) {
  var vm = this;
  vm.userName = "amy";

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
          console.log("data.type-->", data.type);
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
