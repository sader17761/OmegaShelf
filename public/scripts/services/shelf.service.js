app.service( 'ShelfService', function( $http) {
  var sv = this;

  sv.postRegister = function( credentials ) {
    return $http.post('/register', credentials).then(function( response ){
      console.log('back from /register post with response: ', response);
      return response;
    });
  };
  sv.postLogin = function( credentials ) {
    return $http.post('/', credentials).then(function( response ){
      console.log('back from / post with response: ', response);
      return response;
    });
  };

  // postItem(itemToSend);
  sv.postItem = function( poop ) {
    return $http.post('/items', poop).then(function( response ){
      console.log('back from /items post with response: ', response);
      return response;
    });
  };

  sv.getItems = function () {
    return $http.get('/items').then( function (response) {
      // console.log('response is:', response);
      return response;
    });
  };

});
