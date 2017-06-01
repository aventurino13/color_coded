myApp.service('getService',['$http', function($http){

  this.rmItem = function (itemId){
  return $http({
    method:'GET',
    url:'/remove',
    params: {
      id: itemId,
    }
  }).then(function(response) {
    console.log('get all from service', response);
    return response;
  });
}; //end rmItem function

this.userItems = function(userName){
  return $http({
    method:'GET',
    url:'/user',
    params: {
      user: userName,
    }
  }).then(function(response) {
    console.log('get user from service', response);
    return response.data;
  });
}; //end getItems function

this.getItems = function(itemType){
  return $http({
    method:'GET',
    url:'/Items',
    params: {
      type: itemType,
    }
  }).then(function(response) {
    console.log('get items from service', response);
    return response.data;
  });
}; //end getItems function
  //get items of specific type

}]); //end getService
