miApp.factory('fsUser', function (sUser) {

    var objeto = {};
    objeto.nombre = "Factory de Banderas";
    objeto.TraerTodos = TraerTodos;
    objeto.TraerUnObj = TraerUnObj;
    objeto.TraerLogin = TraerLogin;
    objeto.InsertarObj = InsertarObj;
    objeto.ModificarObj = ModificarObj;
    objeto.EliminarObj = EliminarObj;
    
    return objeto;

    function TraerTodos(obj){
      return sUser.TraerTodos(obj);
    }

    function TraerUnObj(obj,id){
      return sUser.TraerUnObj(obj,id);
    }

    function TraerLogin(user){
      return sUser.TraerLogin(user);
    };

    function InsertarObj(obj,user){
      return sUser.InsertarObj(obj,user);
    };

    function ModificarObj(obj,user){
      return sUser.ModificarObj(obj,user);
    };
    
    function EliminarObj(obj,id){
      return sUser.EliminarObj(obj,id);
    };


  })
