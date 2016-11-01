miApp.service('abmPersonaServicio', function ($http) {
  var Url = 'http://localhost:8080/Laboratorio-IV-2016/Clase.09/Clase.07/ws1/';

  this.TraerTodos = TraerTodos;
  function TraerTodos(){
    return $http.get(Url + 'personas')
      .then(function(respuesta) {     
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