miApp.controller("controllerPromocion", function ($scope, $state, $stateParams, FileUploader, fsUser, $location, fRutas) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    if ($location.$$host == "localhost") {
        var Url = fRutas.RutaDesarrollo;
    } else {
        var Url = fRutas.RutasWeb;
    }

    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    $scope.Accion = "Nueva Promocion";
    $scope.Pizza = {};
    $scope.Pizza.precio_promo = 3;
    //inicio las variables



    $scope.pizza = fsUser.TraerTodos('Pizza')
        .then(function (respuesta) {
            $scope.itemsSelectPizza = {};
            $scope.itemsSelectPizza = respuesta;
        }, function (error) {
            console.info(error);
        });

    $scope.local = fsUser.TraerTodos('Local')
        .then(function (respuesta) {
            $scope.itemsSelectLocal = {};
            $scope.itemsSelectLocal = respuesta;
        }, function (error) {
            console.info(error);
        });


    $scope.Guardar = function () {
        if ($scope.objeSeleccionadoPizza == null && $scope.objeSeleccionadoLocal == null)
            return;

        $scope.Pizza.id_local = $scope.objeSeleccionadoLocal.id_local;
        $scope.Pizza.id_pizza = $scope.objeSeleccionadoPizza.id_pizza;
        fsUser.InsertarObj('Promocion', $scope.Pizza)
            .then(function (respuesta) {
                $state.go("Abm.PromocionGrilla");

            }, function (error) {
                console.info(error);
            });
    }
});

miApp.controller("controllerPromociones", function ($scope, $state, $http, fsUser, uiGridConstants) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    $scope.Rol = fsUser.ObtenerRol();

    $scope.titulo = "Promocion";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    if ($scope.Rol != 'ENCARGADO') {
        $scope.gridOptions.columnDefs = columnDefs();
    } else {
        $scope.gridOptions.columnDefs = columnDefsEncargado();
    }
    $scope.gridOptions.enableFiltering = true;

    fsUser.TraerTodos('Promocion')
        .then(function (respuesta) {
            $scope.gridOptions.data = respuesta;
        }, function (error) {
            console.info(error);
        });

    $scope.local = fsUser.TraerTodos('Local')
        .then(function (respuesta) {
            $scope.itemsSelectLocal = {};
            auxiliar = [{}]
            respuesta.forEach(function (item) {
                auxiliar.push({ value: item.descripcion_pizza, label: item.descripcion_pizza });
            })
            $scope.itemsSelectLocal = auxiliar;
        }, function (error) {
            console.info(error);
        });
    function columnDefsEncargado() {
        return [
            { field: 'descripcion_pizza', name: 'Nombre', enableFiltering: false },
            { field: 'precio_promo', name: 'Precio', enableFiltering: false },
            { field: 'nombre_local', name: 'Local', enableFiltering: true },
            {
                field: 'id_promocion', name: 'Borrar', enableFiltering: false, cellTemplate: "<button class=\"btn btn-danger\" "
                + "ng-click=\"grid.appScope.Borrar(row.entity.id_promo)\"><span "
                + "class=\"glyphicon glyphicon-remove-circle\"></span>Borrar</button>"
            }
        ];
    }
    function columnDefs() {
        return [
            { field: 'descripcion_pizza', name: 'Nombre', enableFiltering: false },
            { field: 'precio_promo', name: 'Precio', enableFiltering: false },
            { field: 'nombre_local', name: 'Local', enableFiltering: true }
        ];
    }

    $scope.Borrar = function (id) {
        fsUser.EliminarObj('Promocion', id)
            .then(function (respuesta) {
                fsUser.TraerTodos('Promocion')
                    .then(function (respuesta) {
                        $scope.gridOptions.data = respuesta;

                    }, function (error) {
                        console.info(error);
                    });

            }, function (error) {
                console.info(error);
            });
    }
});