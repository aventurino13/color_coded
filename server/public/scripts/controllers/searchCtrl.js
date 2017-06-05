myApp.controller('searchController', function(getService) {
  console.log('searchController loaded');
  var vm = this;


  vm.findTags = function (){
    vm.srchResults='';
   getService.findItems(vm.searchTag).then(function(response){
     vm.tagResponse = response;
   });

  };

  vm.findUser = function (){
    vm.srchTag='';
    vm.srchResults='';
    getService.userItems(vm.searchUser).then(function(response){
      vm.srchResults = response;
    });
  };

});//end search controller
