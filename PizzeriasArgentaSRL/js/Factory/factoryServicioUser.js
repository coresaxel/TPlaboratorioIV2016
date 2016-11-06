miApp.factory('fsUser', function (sUser) {

    var objeto = {};
    objeto.nombre = "Factory de Banderas";
    objeto.TraerTodos = TraerTodos;
    objeto.TraerUnUser = TraerUnUser;
    objeto.TraerLogin = TraerLogin;
    objeto.InsertarUser = InsertarUser;
    objeto.ModificarUser = ModificarUser;
    objeto.EliminarUser = EliminarUser;
    
    return objeto;

    function TraerTodos(){
      return sUser.TraerTodos();
    }

    function TraerUnUser(id){
      return sUser.TraerUnUser(id);
    }

    function TraerLogin(pais){
      return sUser.TraerLogin(pais);
    };

    function InsertarUser(user){
      return sUser.InsertarUser(user);
    };

    function ModificarUser(user){
      return sUser.ModificarUser(user);
    };
    
    function EliminarUser(id){
      return sUser.EliminarUser(id);
    };


  })
