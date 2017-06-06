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
