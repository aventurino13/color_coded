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

this.voteItem = function (itemId, userName){
return $http({
  method:'GET',
  url:'/user/upvote',
  params: {
    id: itemId,
    user: userName,
  }
}).then(function(response) {
  console.log('in upvote from service', response);
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
    console.log('get user items from service', response);
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


this.getUser = function(){
  return $http({
    method: 'GET',
    url:'/user'
    }).then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            return response.data.username;

        } else {
            // user has no session, bounce them back to the login page
            $location.path("/");
        }
    });
  };

}]); //end getService
