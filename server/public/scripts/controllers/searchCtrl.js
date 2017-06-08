myApp.controller('searchController', function(itemService) {
  console.log('searchController loaded');
  var vm = this;


  vm.findTags = function (){
   itemService.findItems(vm.searchTag).then(function(response){
     vm.tagResponse = response;
   });
   vm.searchTag ='';

  };

  vm.findUser = function (){
    vm.srchTag='';
    itemService.userItems(vm.searchUser).then(function(response){
      vm.srchResults = response;
    });
    vm.srchResults = '';
    vm.srchUser = '';
  };

});//end search controller
