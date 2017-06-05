myApp.service('getService',['$http', function($http){

  this.rmItem = function (itemId){
  return $http({
    method:'GET',
    url:'/user/remove',
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
    url:'/user/userItems',
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
    url:'/user/Items',
    params: {
      type: itemType,
    }
  }).then(function(response) {
    console.log('get items from service', response);
    return response.data;
  });
}; //end getItems function
  //get items of specific type

  this.findItems = function(srchTag){
    console.log(srchTag);
    return $http({
      method: 'GET',
      url:'/user/tags',
      params: {
        tags: srchTag,
      }
      }).then(function(response) {
        console.log('get items from tag search', response.data);
        return response.data;
      });
    };


}]); //end getService
