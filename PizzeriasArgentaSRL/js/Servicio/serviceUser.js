miApp.service('sUser', function ($http, $auth) {
  var Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/';

  this.TraerTodos = TraerTodos;
  function TraerTodos(obj) {
    return $http.get(Url + obj)
      .then(function (respuesta) {
        return respuesta.data;
      })
  };

  this.TraerUnObj = TraerUnObj;
  function TraerUnObj(obj,id) {
    return $http.get(Url + obj + '/' + JSON.stringify(id))
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

  this.InsertarObj = InsertarObj;
  function InsertarObj(obj,persona) {
    return $http.post(Url + obj + '/' + JSON.stringify(persona))
      .then(function (respuesta) {
        return respuesta.data;
      }, function errorCallback(response) {
        console.info(response);
      });
  };

  this.EliminarObj = EliminarObj;
  function EliminarObj(obj,id) {
    return $http.delete(Url + obj + '/' + id)
      .then(function (respuesta) {
        return TraerTodos(obj);
      });
  };

  this.ModificarObj = ModificarObj;
  function ModificarObj(obj,user) {
    return $http.put(Url + obj + '/' + JSON.stringify(user))
      .then(function (respuesta) {
        return respuesta.data;
      }, function errorCallback(response) {
        console.info("error",response);
      })
  };

});