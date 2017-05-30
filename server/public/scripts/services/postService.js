myApp.service('postService',['$http', function($http){


  this.addItem = function(itemToSend){
    console.log('in add items!');

    console.log('this is the itemToSend', itemToSend);
    return $http({
      method:'POST',
      url:'/Items',
      data: itemToSend,
    }).then(function( response ) {
      console.log('get after add in controller', response );
      return response;
      // location.reload();
    });
  };

}]);
