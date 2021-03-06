myApp.service('itemService', ['$http', function($http) {


  this.addItem = function(itemToSend){
    console.log('in addItems in service with itemToSend-->', itemToSend);
    return $http({
      method:'POST',
      url:'/user/userItems',
      data: itemToSend,
    }).then(function( response ) {
      console.log('get after add in controller', response );
      return response;
      // location.reload();
    });
  };//end addItem POST


  this.rmItem = function(itemId) {
    return $http({
      method: 'DELETE',
      url: '/user/remove',
      params: {
        id: itemId,
      }
    }).then(function(response) {
      console.log('get all from service', response);
      return response;
    });
  }; //end rmItem function

  this.voteItem = function(itemId, userName) {
    return $http({
      method: 'PUT',
      url: '/user/upvote',
      params: {
        id: itemId,
        user: userName,
      }
    }).then(function(response) {
      console.log('in upvote from service', response);
      return response;
    });
  }; //end rmItem function

  this.userItems = function(userName) {
    return $http({
      method: 'GET',
      url: '/user/userItems',
      params: {
        user: userName,
      }
    }).then(function(response) {
      console.log('get user items from service', response);
      return response.data;
    });
  }; //end getItems function

  this.getItems = function(itemType) {
    return $http({
      method: 'GET',
      url: '/user/Items',
      params: {
        type: itemType,
      }
    }).then(function(response) {
      console.log('get items from service', response);
      return response.data;
    });
  }; //end getItems function
  //get items of specific type

  this.findItems = function(srchTag) {
    console.log(srchTag);
    return $http({
      method: 'GET',
      url: '/user/tags',
      params: {
        tags: srchTag,
      }
    }).then(function(response) {
      console.log('get items from tag search', response.data);
      return response.data;
    });
  };


  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      return response;
    });
  };

  this.logoutUser = function() {
    return $http({
      method: 'GET',
      url: '/user/logout'
    }).then(function(response) {
      return response;
    });
  };

this.editTags = function(itemId, newTags){
  console.log('in edit tags in items service itemId, newTags-->', itemId, newTags);
  var tagArray = [];
  for (var i =0; i < newTags.length; i++) {
    if (newTags[i] == "null" || "" || undefined){
      newTags[i] = null;
      tagArray.push(newTags[i]);
    } else {
      tagArray.push(newTags[i]);
    }
  }
  return $http({
    method: 'PUT',
    url:'/user/editTags',
    params: {
      tags: tagArray,
      id: itemId
    }
    }).then(function(response) {
        console.log('in edit from service', response);
        return response;
      });
    };



}]); //end getService
