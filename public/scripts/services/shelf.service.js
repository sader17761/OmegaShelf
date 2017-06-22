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

});
