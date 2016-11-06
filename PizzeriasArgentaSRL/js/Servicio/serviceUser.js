miApp.service('sUser', function ($http, $auth) {
  var Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/';

  this.TraerTodos = TraerTodos;
  function TraerTodos() {
    return $http.get(Url + 'User')
      .then(function (respuesta) {
        return respuesta.data;
      })
  };

  this.TraerUnUser = TraerUnUser;
  function TraerUnUser(id) {
    return $http.get(Url + 'User/' + JSON.stringify(id))
      .then(function (respuesta) {
        return respuesta.data;
      })
  };

  this.TraerLogin = TraerLogin;
  function TraerLogin(user) {
    return $auth.login(user)
      .then(function (respuesta) {
        return respuesta.data;
      })
  };

  this.InsertarUser = InsertarUser;
  function InsertarUser(persona) {
    return $http.post(Url + 'User/' + JSON.stringify(persona))
      .then(function (respuesta) {
        return respuesta.data;
      }, function errorCallback(response) {
        console.info(response);
      });
  };

  this.EliminarUser = EliminarUser;
  function EliminarUser(id) {
    return $http.delete(Url + "User/" + id)
      .then(function (respuesta) {
        return TraerTodos();
      });
  };

  this.ModificarUser = ModificarUser;
  function ModificarUser(user) {
    console.info(user);
    return $http.put(Url + 'User/' + JSON.stringify(user))
      .then(function (respuesta) {
        return respuesta.data;
      }, function errorCallback(response) {
        console.info("error",response);
      })
  };

});