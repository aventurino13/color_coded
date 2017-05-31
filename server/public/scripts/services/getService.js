myApp.service('getService',['$http', function($http){

  this.rmItem = function (id){
  return $http({
    method:'GET',
    url:'/remove',
    params: {
      _id: id,
    }
  }).then(function(response) {
    console.log('get all from service', response);
    return response.data;
  });
}; //end rmItem function

this.userItems = function(userName, itemIype){
  return $http({
    method:'GET',
    url:'/user',
    params: {
      user: userName,
      type: itemType,
    }
  }).then(function(response) {
    console.log('get arch from service', response);
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
    console.log('get type from service', response);
    return response.data;
  });
}; //end getItems function
  //get items of specific type

}]); //end getService
