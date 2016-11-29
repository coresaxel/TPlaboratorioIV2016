miApp.filter('rol', function () {
    var rol = {
        'ADMINISTRADOR': 'ADMINISTRADOR',
        'CLIENTE': 'CLIENTE',
        'EMPLEADO': 'EMPLEADO',
        'ENCARGADO': 'ENCARGADO'
    }
    return function (input) {
        if (!input)
            return '';
        return rol[input];
    };
})
miApp.filter('local', function (fsUser) {
    var local = {};
    fsUser.TraerTodos('Local')
        .then(function (respuesta) {
            local = respuesta;
        }, function (error) {
            console.info(error);
        });
    return function (input) {
        if (!input)
            return '';
        return local[input];
    };
});