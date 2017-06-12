myApp.controller('viewsController', function(itemService, $scope) {

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
      vm.showAlert();
    });
  };
  vm.showAlert = function (){

  $scope.alerts = [
    { type: 'success', msg: 'Successful Upvote!' }
  ];
  $scope.show = true;
  };

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

});
