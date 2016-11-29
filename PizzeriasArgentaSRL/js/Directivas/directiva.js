miApp.directive('presentacionPizzeria', function () {

    return {
        replace: true,
        restrict: "MEAC",
        templateUrl: "./Templates/Directivas/InicioDirectiva.html",
		controller: "controllerLogin"
    };
})
