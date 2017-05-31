var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    template:'<div> Default</div>'
  }).when('/add', {
    templateUrl: 'views/add.html',
    controller: 'UserController as uc'
  }).when('/arch', {
    templateUrl: 'views/arch.html',
    controller: 'UserController as uc'
  }).when('/dsgn', {
    templateUrl: 'views/dsgn.html',
    controller: 'UserController as uc'
  }).when('/art', {
    templateUrl: 'views/arch.html',
    controller: 'UserController as uc'
  }).otherwise('/');

    $locationProvider.html5Mode(true);

});//end ang-route config

myApp.controller('UserController', function(postService, getService) {
  var vm = this;

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
}


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


    vm.getUserItems = function (user, type){
      getService.userItems(user, type).then(function(data){
        console.log('in get user items return', data);
        vm.result = data;
      });
    };

  vm.allItems = function (type){
    getService.getItems(type).then(function(data){
      console.log('in get all items return', data);
      vm.result = data;
    });

  };

    vm.deleteItem = function (id, type){
      getService.getAll(id).then(function(data){
        console.log('in .then delte return', data);
      });
    };
});
