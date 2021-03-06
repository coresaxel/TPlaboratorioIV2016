miApp.controller("controllerPedido", function ($scope, $state, $stateParams, FileUploader, fsUser, $location, fRutas, $filter) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    if ($location.$$host == "localhost") {
        var Url = fRutas.RutaDesarrollo;
    } else {
        var Url = fRutas.RutasWeb;
    }
    $scope.Rol = fsUser.ObtenerRol();
    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    $scope.Accion = "Nuevo Pedido";
    $scope.Pedido = {};
    $scope.Pedido.cantidad_pizza = 3;


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

    $scope.user = fsUser.TraerTodos('User')
        .then(function (respuesta) {
            $scope.itemsSelectUser = {};
            $scope.itemsSelectUser = respuesta;
        }, function (error) {
            console.info(error);
        });

    $scope.Guardar = function () {
        if ($scope.FormIngreso.objeSeleccionadoPizza == null && $scope.FormIngreso.objeSeleccionadoLocal == null) {
            alert("Debe completar todas las opciones");
            return;
        }
        var someDateDesde = new Date();
        someDateDesde.setDate(someDateDesde.getDate() + 2);
        var someDateHasta = new Date();
        someDateHasta.setDate(someDateHasta.getDate() + 5);
        if ($scope.Pedido.fecha_entrega < someDateDesde && $scope.Pedido.fecha_entrega > someDateHasta) {
            alert("La fecha de pedido debe ser mayor a dos dias y menor que cinco ");
            return;
        }

        $scope.Pedido.id_local = $scope.FormIngreso.objeSeleccionadoLocal.id_local;
        $scope.Pedido.id_pizza = $scope.FormIngreso.objeSeleccionadoPizza.id_pizza;
        if ($scope.Rol == 'CLIENTE') {
            $scope.Pedido.id_user = fsUser.ObtenerRol();
        }
        else {
            $scope.Pedido.id_user = $scope.FormIngreso.objeSeleccionadoUser.id_usuario;
            
        }

        fsUser.InsertarObj('Pedido', $scope.Pedido)
            .then(function (respuesta) {
                $state.go("Abm.PedidoGrilla");

            }, function (error) {
                console.info(error);
            });
    }
});

miApp.controller("controllerPedidos", function ($scope, $state, $http, fsUser, $modal) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    $scope.Rol = fsUser.ObtenerRol();

    $scope.titulo = "Pedido";
    $scope.gridOptions = {
        enableHorizontalScrollbar: 2,
        enableVerticalScrollbar: 0,
    };
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    if ($scope.Rol != 'ENCARGADO') {
        $scope.gridOptions.columnDefs = columnDefs();
    } else {
        $scope.gridOptions.columnDefs = columnDefsEncargado();
    }
    $scope.gridOptions.enableFiltering = false;

    fsUser.TraerTodos('Pedido')
        .then(function (respuesta) {
            var auxiliar = [];
            respuesta.forEach(function (item) {
                if ($scope.Rol == "CLIENTE" && item.id_user == fsUser.ObtenerId()) {
                    auxiliar.push(item);
                } else {
                    if ($scope.Rol != "CLIENTE") {
                        auxiliar.push(item);
                    }
                }
            })
            $scope.gridOptions.data = auxiliar;
        }, function (error) {
            console.info(error);
        });


    function columnDefsEncargado() {
        return [
            { field: 'nombre_usuario', name: 'Nombre Usuario' },
            { field: 'descripcion_pizza', name: 'Pizza' },
            { field: 'nombre_local', name: 'Local' },
            { field: 'cantidad_pizza', name: 'Cantidad' },
            { field: 'fecha_entrega', name: 'Fecha' },
            { field: 'estado_pedido', cellTemplate: '<div ng-if="row.entity.estado_pedido == 0">Pendiente</div/><div ng-if="row.entity.estado_pedido == 1">Finalizado</div/>', name: 'Estado' },
            {
                field: 'id_pedido', name: 'Mapa', cellTemplate: "<button class=\"btn btn-info\" "
                + "ng-click=\"grid.appScope.MostrarMapa(row.entity.id_user,row.entity.id_local)\"><span "
                + "class=\"glyphicon glyphicon-eye-open\"></span> Mostrar</button>"
            },
            {
                field: 'id_pedido', name: 'Borrar', cellTemplate: "<button class=\"btn btn-danger\" "
                + "ng-click=\"grid.appScope.Borrar(row.entity.id_pedido)\"><span "
                + "class=\"glyphicon glyphicon-remove\"></span> Borrar</button>"
            },

            {
                field: 'id_pedido', name: 'Cerrar', cellTemplate: "<button  class=\"btn btn-warning\" "
                + "ng-click=\"grid.appScope.CerrarPedido(row.entity.id_pedido)\"><span "
                + "class=\"glyphicon glyphicon-remove-circle\"></span> Cerrar</button>"
            }
        ];
    }


    function columnDefs() {
        return [
            { field: 'nombre_usuario', name: 'Nombre Usuario' },
            { field: 'descripcion_pizza', name: 'Pizza' },
            { field: 'nombre_local', name: 'Local' },
            { field: 'cantidad_pizza', name: 'Cantidad' },
            { field: 'fecha_entrega', name: 'Fecha' },
            { field: 'estado_pedido', cellTemplate: '<div ng-if="row.entity.estado_pedido == 0">Pendiente</div/><div ng-if="row.entity.estado_pedido == 1">Finalizado</div/>', name: 'Estado' },
            {
                field: 'id_pedido', name: 'Mapa', cellTemplate: "<button class=\"btn btn-info\" "
                + "ng-click=\"grid.appScope.MostrarMapa(row.entity.id_user,row.entity.id_local)\"><span "
                + "class=\"glyphicon glyphicon-eye-open\"></span> Mostrar</button>"
            }
        ];
    }
    $scope.Borrar = function (id) {
        fsUser.EliminarObj('Pedido', id)
            .then(function (respuesta) {
                fsUser.TraerTodos('Pedido')
                    .then(function (respuesta) {
                        $scope.gridOptions.data = respuesta;

                    }, function (error) {
                        console.info(error);
                    });

            }, function (error) {
                console.info(error);
            });
    }

    $scope.CerrarPedido = function (id) {
        fsUser.ModificarObj('Pedido', id)
            .then(function (respuesta) {
                console.info(respuesta)
                fsUser.TraerTodos('Pedido')
                    .then(function (respuesta) {
                        $scope.gridOptions.data = respuesta;
                    }, function (error) {
                        console.info(error);
                    });

            }, function (error) {
                console.info(error);
            });
    }
    $scope.MostrarMapa = function (idUser, idLocal) {
        var local = fsUser.TraerUnObj('Local', idLocal)
            .then(function (respuesta) {
                local = respuesta;
                $scope.Incio = { lat: local.latitud_local, lng: local.longitud_local }
            }, function (error) {
                console.info(error);
            });

        var user = fsUser.TraerUnObj('User', idUser)
            .then(function (respuesta) {
                user = respuesta;
                $scope.Final = { lat: user.latitud_persona, lng: user.longitud_persona }
                console.info($scope.Final)
            }, function (error) {
                console.info(error);
            });

    }
});
