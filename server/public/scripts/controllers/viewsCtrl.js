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


  vm.upVote = function(itemId){
    getService.getUser().then(function(data){
      vm.user = data;
      console.log("user who wants to vote", vm.user);
      return vm.user;
    });
    getService.voteItem(itemId, vm.user).then(function(data){
      console.log('in up vote item return', data);
      vm.getArch();
      vm.getDsgn();
      vm.getArt();
    });
  };

});
