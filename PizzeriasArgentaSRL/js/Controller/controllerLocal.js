miApp.controller("controllerLocal", function ($scope, $state, $stateParams, FileUploader, fsUser, $location, fRutas) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    if ($location.$$host == "localhost") {
        var Url = fRutas.RutaDesarrollo;
    } else {
        var Url = fRutas.RutasWeb;
    }

    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    if ($stateParams.param1 == null) {
        $scope.Accion = "Nuevo Local"
        //inicio las variables
        $scope.local = {};
        $scope.local.nombre_local = "Pizzeria Wilde";
        $scope.local.direccion_local = "Wilde 123";
        $scope.local.latitud_local = 0;
        $scope.local.longitud_local = 0;
        $scope.local.foto_local = Url + "fotos/pordefecto.png";
    } else {
        $scope.Accion = "Modificar Local"
        //inicio las variables
        $scope.local = {};
        $scope.local.nombre_local = $stateParams.param1.nombre_local;
        $scope.local.direccion_local = $stateParams.param1.direccion_local;
        $scope.local.latitud_local = $stateParams.param1.latitud_local;
        $scope.local.longitud_local = $stateParams.param1.longitud_local;
        $scope.local.foto_local = $stateParams.param1.foto_local;
        $scope.local.id_local = $stateParams.param1.id_local;
        $scope.lat = $stateParams.param1.latitud_local;
        $scope.lng = $stateParams.param1.longitud_local;
    }
    $scope.SubirdorArchivos.onCompleteAll = function (item, response, status, headers) {

        if ($stateParams.param1 == null) {
            fsUser.InsertarObj('Local', $scope.local)
                .then(function (respuesta) {
                    $state.go("Abm.LocalGrilla");

                }, function (error) {
                    console.info(error);
                });
        } else {


            fsUser.ModificarObj('Local', $scope.local)
                .then(function (respuesta) {
                    $state.go("Abm.LocalGrilla");

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
            $scope.local.foto_local = nombreFoto;
        }
        $scope.SubirdorArchivos.uploadAll();
    }

    $scope.placeMarker = function (e) {

        var marker = new google.maps.Marker({ position: e.latLng, map: $scope.map });
        $scope.map.panTo(e.latLng);
        $scope.local.latitud_local = e.latLng.lat();
        $scope.local.longitud_local = e.latLng.lng();
    }
});

miApp.controller("controllerLocales", function ($scope, $state, $http, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    $scope.Rol = fsUser.ObtenerRol();

    $scope.titulo = "Locales";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    if ($scope.Rol != 'ENCARGADO') {
        $scope.gridOptions.columnDefs = columnDefs();
    } else {
        $scope.gridOptions.columnDefs = columnDefsEncargado();
    }
    $scope.gridOptions.enableFiltering = false;

    fsUser.TraerTodos('Local')
        .then(function (respuesta) {
            $scope.gridOptions.data = respuesta;

        }, function (error) {
            console.info(error);
        });


    function columnDefs() {
        return [
            { field: 'nombre_local', name: 'Nombre' },
            { field: 'direccion_local', name: 'Direccion' },
            { field: 'id_local', name: 'Detalles', cellTemplate: "<button class=\"btn btn\" ng-click=\"grid.appScope.Ver(row.entity.id_local)\"><span class=\"glyphicon glyphicon-eye-open\"></span> Ver</button>" }
        ];
    }

    function columnDefsEncargado() {
        return [
            { field: 'nombre_local', name: 'Nombre' },
            { field: 'direccion_local', name: 'Direccion' },
            { field: 'id_local', name: 'Detalles', cellTemplate: "<button class=\"btn btn\" ng-click=\"grid.appScope.Ver(row.entity.id_local)\"><span class=\"glyphicon glyphicon-eye-open\"></span> Ver</button>" },
            { field: 'id_local', name: 'Borrar', cellTemplate: "<button class=\"btn btn-danger\" ng-click=\"grid.appScope.Borrar(row.entity.id_local)\"><span class=\"glyphicon glyphicon-remove\"></span> Borrar</button>" },
            { field: 'id_local', name: 'Editar', cellTemplate: "<button class=\"btn btn-warning\" ng-click=\"grid.appScope.Modificar(row.entity.id_local)\"><span class=\"glyphicon glyphicon-edit\"></span> Modificar</button>" }
        ];
    }

    $scope.Borrar = function (id) {
        fsUser.EliminarObj('Local', id)
            .then(function (respuesta) {
                fsUser.TraerTodos('Local')
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
        fsUser.TraerUnObj('Local', id)
            .then(function (respuesta) {

                $state.go("Abm.Local", { 'param1': respuesta });

            }, function (error) {
                console.info(error);
            });
    };

    $scope.Ver = function (id) {
        fsUser.TraerUnObj('Local', id)
            .then(function (respuesta) {
                $state.go("Abm.LocalVer", { 'param1': respuesta });

            }, function (error) {
                console.info(error);
            });
    };

});

miApp.controller("controllerLocalVer", function ($scope, $state, $stateParams, fsUser) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    if ($stateParams.param1 != null) {
        $scope.local = {};
        $scope.local.nombre_local = $stateParams.param1.nombre_local;
        $scope.local.foto_local = $stateParams.param1.foto_local;
        $scope.local.latitud_local = $stateParams.param1.latitud_local;
        $scope.local.longitud_local = $stateParams.param1.longitud_local;

    } else {
        $state.go('Abm.LocalGrilla');
    }

});

