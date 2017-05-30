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
  var client = filestack.init('ANxEyrmJzQsSnoC7PFCcXz', { policy: 'policy', signature: 'signature' });
  client.pick({
accept: 'image/*',
maxFiles: 5,
storeTo: {
  location: 's3'
}
}).then(function(result) {
console.log(JSON.stringify(result.filesUploaded))
});
}


  vm.addItem = function(){
      var itemToSend = {
        imgURL: vm.imgURL,
        imgUpld: vm.imgUpld,
        title: vm.title,
        linkURL: vm.linkURL,
        type: vm.type,
        tags: [vm.tag1, vm.tag2, vm.tag3, vm.tag4, vm.tag5],
        fav: vm.fav,
        // user: vm.userName,  ADD IF AUTHENTICATION ADDED
        };
      postService.addItem(itemToSend);
    };//end add Item


    vm.getItems = function (type){
      getService.getItems(type).then(function(data){
        console.log('in .then arch return', data);
        vm.result = data;
      });
    };
});
