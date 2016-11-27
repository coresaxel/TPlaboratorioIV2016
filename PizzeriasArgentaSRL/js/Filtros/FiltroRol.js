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
});