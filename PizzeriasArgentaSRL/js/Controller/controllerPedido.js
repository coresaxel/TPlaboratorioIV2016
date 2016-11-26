miApp.controller("controllerPedido", function($scope, $state, $stateParams, FileUploader, fsUser, $location, fRutas, $filter) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    if ($location.$$host == "localhost") {
        var Url = fRutas.RutaDesarrollo;
    } else {
        var Url = fRutas.RutasWeb;
    }

    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    $scope.Accion = "Nuevo Pedido";
    $scope.Pedido = {};
    $scope.Pedido.cantidad_pizza = 3;


    $scope.pizza = fsUser.TraerTodos('Pizza')
        .then(function(respuesta) {
            $scope.itemsSelectPizza = {};
            $scope.itemsSelectPizza = respuesta;
        }, function(error) {
            console.info(error);
        });

    $scope.local = fsUser.TraerTodos('Local')
        .then(function(respuesta) {
            $scope.itemsSelectLocal = {};
            $scope.itemsSelectLocal = respuesta;
        }, function(error) {
            console.info(error);
        });

    $scope.user = fsUser.TraerTodos('User')
        .then(function(respuesta) {
            $scope.itemsSelectUser = {};
            $scope.itemsSelectUser = respuesta;
        }, function(error) {
            console.info(error);
        });

    $scope.Guardar = function() {
        if ($scope.objeSeleccionadoPizza == null && $scope.objeSeleccionadoLocal == null && $scope.objeSeleccionadoUser == null)
            return;
        $scope.Pedido.id_local = $scope.objeSeleccionadoLocal.id_local;
        $scope.Pedido.id_pizza = $scope.objeSeleccionadoPizza.id_pizza;
        $scope.Pedido.id_user = $scope.objeSeleccionadoUser.id_usuario;
        fsUser.InsertarObj('Pedido', $scope.Pedido)
            .then(function(respuesta) {
                $state.go("Abm.PedidoGrilla");

            }, function(error) {
                console.info(error);
            });
    }
});

miApp.controller("controllerPedidos", function($scope, $state, $http, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    $scope.titulo = "Pedido";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.enableFiltering = false;

    fsUser.TraerTodos('Pedido')
        .then(function(respuesta) {
            $scope.gridOptions.data = respuesta;
        }, function(error) {
            console.info(error);
        });


    function columnDefs() {
        return [
            { field: 'nombre_usuario', name: 'Nombre Usuario' },
            { field: 'descripcion_pizza', name: 'Pizza' },
            { field: 'nombre_local', name: 'Local' },
            { field: 'cantidad_pizza', name: 'Cantidad' },
            { field: 'fecha_entrega', name: 'Fecha' },
            { field: 'estado_pedido', cellTemplate:'<div ng-if="row.entity.estado_pedido == 0">Pendiente</div/><div ng-if="row.entity.estado_pedido == 1">Finalizado</div/>',name: 'Estado' },
            {
                field: 'id_pedido', name: 'Borrar', cellTemplate: "<button class=\"btn btn-danger\" "
                + "ng-click=\"grid.appScope.Borrar(row.entity.id_pedido)\"><span "
                + "class=\"glyphicon glyphicon-remove-circle\"></span>Borrar</button>"
            },
            {
                field: 'id_pedido', name: 'Mapa', cellTemplate: "<button class=\"btn btn-info\" "
                + "ng-click=\"grid.appScope.Borrar(row.entity.id_pedido)\"><span "
                + "class=\"glyphicon glyphicon-remove-circle\"></span>Borrar</button>"
            },
            {
                field: 'id_pedido', name: 'Cerrar', cellTemplate: "<button class=\"btn btn-warning\" "
                + "ng-click=\"grid.appScope.CerrarPedido(row.entity.id_pedido)\"><span "
                + "class=\"glyphicon glyphicon-remove-circle\"></span>Cerrar</button>"
            }
        ];
    }

    $scope.Borrar = function(id) {
        fsUser.EliminarObj('Pedido', id)
            .then(function(respuesta) {
                fsUser.TraerTodos('Pedido')
                    .then(function(respuesta) {
                        $scope.gridOptions.data = respuesta;

                    }, function(error) {
                        console.info(error);
                    });

            }, function(error) {
                console.info(error);
            });
    }

    $scope.CerrarPedido = function(id) {
        fsUser.ModificarObj('Pedido', id)
            .then(function(respuesta) {
                console.info(respuesta)
                fsUser.TraerTodos('Pedido')
                    .then(function(respuesta) {
                        $scope.gridOptions.data = respuesta;
                    }, function(error) {
                        console.info(error);
                    });

            }, function(error) {
                console.info(error);
            });
    }
});
