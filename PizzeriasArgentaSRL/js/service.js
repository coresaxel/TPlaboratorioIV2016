miApp.service('services', function ($http,$auth) {
  var Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/';

  this.TraerTodos = TraerTodos;
  function TraerTodos(){
    return $http.get(Url + 'personas')
      .then(function(respuesta) {     
       return respuesta.data;
    })
  };
   
  this.TraerLogin = TraerLogin;
  function TraerLogin(user){
    return $http.get(Url + 'Login/' + JSON.stringify(user))
      .then(function(respuesta) { 
      console.info("suerp", respuesta);    
      
       return respuesta.data;
    })
  };

   this.InsertarObjeto = InsertarObjeto;
   function InsertarObjeto(persona){
    //console.info(persona);
   return $http.post(Url + 'personas/'+ JSON.stringify(persona)) 
        .then(function(respuesta) { 
          return respuesta.data;
          })
   };



   this.BorrarObjeto = BorrarObjeto;
   function BorrarObjeto(id){
    return $http.delete(Url + "personas/" + id) 
    .then(function(respuesta) {
      return TraerTodos();
    });
   };

   this.ModificarObjeto = ModificarObjeto;
   function ModificarObjeto(persona){
    return $http.put(Url + 'personas/'+ JSON.stringify(persona))
    .then(function(respuesta) 
    {
      return respuesta.data;
    })
  };

});