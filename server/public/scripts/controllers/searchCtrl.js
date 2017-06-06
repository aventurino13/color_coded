myApp.controller('searchController', function(getService) {
  console.log('searchController loaded');
  var vm = this;


  vm.findTags = function (){
   getService.findItems(vm.searchTag).then(function(response){
     vm.tagResponse = response;
   });
   vm.searchTag ='';

  };

  vm.findUser = function (){
    vm.srchTag='';
    getService.userItems(vm.searchUser).then(function(response){
      vm.srchResults = response;
    });
    vm.srchResults = '';
    vm.srchUser = '';
  };

});//end search controller
