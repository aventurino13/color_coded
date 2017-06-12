myApp.controller('UserController', function($location, itemService, $scope) {
  var vm = this;

//   // Upon load, check this user's session on the server
vm.checkUser = function () {
  itemService.getUser().then(function(response){
  if(response.data.username) {
      // user has a curret session on the server
      vm.userName = response.data.username;
      console.log('User Data: ', vm.userName);
      vm.getUserItems();
      return vm.userName;
  } else {
      // user has no session, bounce them back to the login page
      $location.path("/");
    }
  });
};

vm.logout = function() {
  itemService.logoutUser().then(function(response){
      $location.path("/login");
  });

};


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
      itemService.addItem(itemToSend);
      vm.showAlert();
    };//end add Item


    vm.getUserItems = function (){
      itemService.userItems(vm.userName).then(function(data){
        console.log('in get user return', data);
        vm.archResult = [];
        vm.dsgnResult = [];
        vm.artResult = [];
        for (var i=0; i<data.length; i++){
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
            itemService.rmItem(id).then(function(data){
              console.log('in .then delte return', data);
                vm.getUserItems();
            });

          };

vm.updateTags = function (id, newTags) {
    console.log(newTags);
    console.log(id);
  itemService.editTags(id, newTags).then(function(data){
  console.log('in update tags return', data);
  });
};


vm.showAlert = function (){

$scope.alerts = [
  { type: 'success', msg: 'Your image as been added!' }
];
$scope.show = true;
};

$scope.addAlert = function() {
  $scope.alerts.push({msg: 'Another alert!'});
};

$scope.closeAlert = function(index) {
  $scope.alerts.splice(index, 1);
};
    // vm.getUserItems();

vm.checkUser();

});
