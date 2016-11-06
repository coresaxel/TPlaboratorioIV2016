miApp.controller("controllerPizza", function ($scope, $state, $stateParams, FileUploader, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    if ($stateParams.param1 == null) {
        $scope.Accion = "Nueva Pizza"
        //inicio las variables
        $scope.Pizza = {};
        $scope.Pizza.descripcion_pizza = "Pizza Wilde";
        $scope.Pizza.precio_pizza = 2;
        $scope.Pizza.foto_pizza = Url + "fotos/pordefecto.png";
    } else {
        $scope.Accion = "Modificar Pizza"
        //inicio las variables
        $scope.Pizza = {};
        $scope.Pizza.descripcion_pizza = $stateParams.param1.descripcion_pizza;
        $scope.Pizza.precio_pizza = $stateParams.param1.precio_pizza;
        $scope.Pizza.foto_pizza = Url + $stateParams.param1.foto_pizza;
        $scope.Pizza.id_pizza = $stateParams.param1.id_pizza;
    }
    $scope.SubirdorArchivos.onCompleteAll = function (item, response, status, headers) {

        if ($stateParams.param1 == null) {
            fsUser.InsertarObj('Pizza', $scope.Pizza)
                .then(function (respuesta) {
                    $state.go("Abm.PizzaGrilla");

                }, function (error) {
                    console.info(error);
                });
        } else {


            fsUser.ModificarObj('Pizza', $scope.Pizza)
                .then(function (respuesta) {
                    $state.go("Abm.PizzaGrilla");

                }, function (error) {
                    console.info(error);
                });

        }
    }
    $scope.Guardar = function () {
        if ($scope.SubirdorArchivos.queue != undefined) {
            var nombreFoto = "";
            for (i in $scope.SubirdorArchivos.queue) {
                if (nombreFoto != "")
                    nombreFoto = nombreFoto + ";" + ($scope.SubirdorArchivos.queue[i]._file.name);
                else
                    nombreFoto = ($scope.SubirdorArchivos.queue[i]._file.name);
            }
            $scope.Pizza.foto_pizza = nombreFoto;
        }
        $scope.SubirdorArchivos.uploadAll();
    }
});

miApp.controller("controllerPizzas", function ($scope, $state, $http, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    $scope.titulo = "Pizzas";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.enableFiltering = false;

    fsUser.TraerTodos('Pizza')
        .then(function (respuesta) {
            $scope.gridOptions.data = respuesta;

        }, function (error) {
            console.info(error);
        });


    function columnDefs() {
        return [
            { field: 'descripcion_pizza', name: 'Nombre' },
            { field: 'precio_pizza', name: 'Precio' },
            { field: 'id_pizza', name: 'Borrar', cellTemplate: "<button class=\"btn btn-danger\" ng-click=\"grid.appScope.Borrar(row.entity.id_pizza)\"><span class=\"glyphicon glyphicon-remove-circle\"></span>Borrar</button>" },
            { field: 'id_pizza', name: 'Editar', cellTemplate: "<button class=\"btn btn-warning\" ng-click=\"grid.appScope.Modificar(row.entity.id_pizza)\"><span class=\"glyphicon glyphicon-edit\"></span>Modificar</button>" }
        ];
    }

    $scope.Borrar = function (id) {
        fsUser.EliminarObj('Pizza', id)
            .then(function (respuesta) {
                fsUser.TraerTodos('Pizza')
                    .then(function (respuesta) {
                        $scope.gridOptions.data = respuesta;

                    }, function (error) {
                        console.info(error);
                    });

            }, function (error) {
                console.info(error);
            });

    }


    $scope.Modificar = function (id) {
        fsUser.TraerUnObj('Pizza', id)
            .then(function (respuesta) {

                $state.go("Abm.Pizza", { 'param1': respuesta });

            }, function (error) {
                console.info(error);
            });
    };

});
