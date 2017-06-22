app.service( 'ShelfService', function( $http) {
  var sv = this;

  sv.postRegister = function( credentials ) {
    return $http.post('/register', credentials).then(function( response ){
      console.log('back from /register post with response: ', response);
    });
  };

});
