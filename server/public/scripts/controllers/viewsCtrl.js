myApp.controller('viewsController', function(itemService) {

  var vm = this;

  vm.allArch=[];
  vm.allArt=[];
  vm.allDsign=[];

  vm.getArch = function (){
    itemService.getItems("arch").then(function(data){
      console.log('in get all arch return', data);
      vm.allArch = data;
    });

  };

  vm.getDsgn = function (){
    itemService.getItems("dsgn").then(function(data){
      console.log('in get all dsgn return', data);
      vm.allDsgn = data;
    });

  };

  vm.getArt = function (){
    itemService.getItems("art").then(function(data){
      console.log('in get all art return', data);
      vm.allArt = data;
    });

  };


  vm.upVote = function(itemId){
    itemService.getUser().then(function(response){
      vm.user = response.data.username;
      console.log("user who wants to vote", vm.user);
      return vm.user;
    });
    itemService.voteItem(itemId, vm.user).then(function(data){
      console.log('in up vote item return', data);
      vm.getArch();
      vm.getDsgn();
      vm.getArt();
    });
  };


});
