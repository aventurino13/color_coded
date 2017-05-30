myApp.service('postService',['$http', function($http){

  var service = this;


service.addItem = function(itemToSend){
    console.log('in add items!');

    console.log('this is the itemTOsend', itemToSend);
    return $http({
      method:'POST',
      url:'/user/AddItem',
      data: itemToSend,
    }).then(function(res) {
      console.log('get after add in controller', res);
      // location.reload();
    });
  };
}]);
