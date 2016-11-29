miApp.factory('fsUser', function(sUser, $auth) {

    var objeto = {};
    objeto.nombre = "Factory de Banderas";
    objeto.TraerTodos = TraerTodos;
    objeto.TraerUnObj = TraerUnObj;
    objeto.TraerLogin = TraerLogin;
    objeto.InsertarObj = InsertarObj;
    objeto.ModificarObj = ModificarObj;
    objeto.EliminarObj = EliminarObj;
    objeto.TraerTodosObjeto = TraerTodosObjeto;
    objeto.VerificarLogin = VerificarLogin;
    objeto.ObtenerRol = ObtenerRol;
    objeto.ObtenerId = ObtenerId;

    return objeto;

    function VerificarLogin() {
        return $auth.isAuthenticated();
    }

    function ObtenerRol() {
        if ($auth.isAuthenticated()) {
            return ($auth.getPayload()).usuario[0].descripcion_rol;
        }
    }
        function ObtenerId() {
        if ($auth.isAuthenticated()) {
            return ($auth.getPayload()).usuario[0].id_usuario;
        }
    }

    function TraerTodosObjeto(obj) {
        return sUser.TraerTodos(obj);
    }

    function TraerTodos(obj) {
        return sUser.TraerTodos(obj);
    }

    function TraerUnObj(obj, id) {
        return sUser.TraerUnObj(obj, id);
    }

    function TraerLogin(user) {
        return sUser.TraerLogin(user);
    };

    function InsertarObj(obj, user) {
        return sUser.InsertarObj(obj, user);
    };

    function ModificarObj(obj, user) {
        return sUser.ModificarObj(obj, user);
    };

    function EliminarObj(obj, id) {
        return sUser.EliminarObj(obj, id);
    };


})
