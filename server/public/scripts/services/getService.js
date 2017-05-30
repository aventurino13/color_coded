myApp.service('getService',['$http', function($http){

  //get items of specific type
  this.getItems = function(type){
    return $http({
      method:'GET',
      url:'/'+ type
    }).then(function(response) {
      console.log('get type from service', response);
      return response.data;
    });
  }; //end getItems function

  this.getFavs = function(){
    return $http({
      method:'GET',
      url:'/favs'
    }).then(function(response) {
      console.log('get favs from service', response);
      return response.data;
    });
  }; //end getItems function

}]); //end getService
