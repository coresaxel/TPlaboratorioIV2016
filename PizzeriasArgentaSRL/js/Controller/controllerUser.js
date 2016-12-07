miApp.controller("controllerLogin", function ($scope, $state, $auth, fsUser, $location, fRutas) {

    if ($auth.isAuthenticated()) {
        $scope.UserName = ($auth.getPayload()).usuario[0].nombre_usuario;
        $scope.Rol = fsUser.ObtenerRol();
    }


    $scope.Test = function (rol) {
        switch (rol) {
            case 'Admin':
                $scope.FormIngreso.a_user = "AXELCORES";
                $scope.FormIngreso.a_pass = "A1";
                break;
            case 'Empleado':
                $scope.FormIngreso.a_user = "EmpleadoArgento";
                $scope.FormIngreso.a_pass = "1234";
                break;
            case 'Cliente':
                $scope.FormIngreso.a_user = "Dardo";
                $scope.FormIngreso.a_pass = "1234";
                break;
            case 'Encargado':
                $scope.FormIngreso.a_user = "Axel1";
                $scope.FormIngreso.a_pass = "1234";
                break;
        }
    }

    $scope.Login = function () {
        user = {};
        user.name = $scope.FormIngreso.a_user;
        user.pass = $scope.FormIngreso.a_pass;

        fsUser.TraerLogin(user)
            .then(function (response) {
                if ($auth.isAuthenticated()) {
                    $scope.FormIngreso.UserName = $scope.FormIngreso.a_user;
                    $state.reload()
                }
            })
            .catch(function (response) {
                console.info("error", response);
            });
    }



    $scope.Logout = function () {
        $scope.UserName = "";
        $state.go('Pizzeria.Principal');
        $auth.logout();
    }


});

miApp.controller("controllerUser", function ($scope, $state, $stateParams, FileUploader, fsUser, $location, fRutas, NgMap, $auth) {

    // if (!fsUser.VerificarLogin())
    //     $state.go('Pizzeria.Principal');

    $scope.Rol = fsUser.ObtenerRol();
    if ($location.$$host == "localhost") {
        var Url = fRutas.RutaDesarrollo;
    } else {
        var Url = fRutas.RutasWeb;
    }
    $scope.pizza = fsUser.TraerTodos('Rol')
        .then(function (respuesta) {
            $scope.itemsSelectRol = {};
            var aux = [{}];
            respuesta.forEach(function (item) {
                if ($scope.Rol == null && (item.descripcion_rol == "CLIENTE")) {
                    aux.push(item);
                }
                if ($scope.Rol == 'ADMINISTRADOR' && (item.descripcion_rol == "CLIENTE" || item.descripcion_rol == "EMPLEADO" || item.descripcion_rol == "ENCARGADO" || item.descripcion_rol == "ADMINISTRADOR")) {
                    aux.push(item);
                }
                if ($scope.Rol == 'EMPLEADO' && (item.descripcion_rol == "CLIENTE")) {
                    aux.push(item);
                }
                if ($scope.Rol == 'ENCARGADO' && (item.descripcion_rol == "CLIENTE" || item.descripcion_rol == "EMPLEADO")) {
                    aux.push(item);
                }
            })
            $scope.itemsSelectRol = aux;
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

    $scope.SubirdorArchivos = new FileUploader({ url: Url + 'archivos' });
    if ($stateParams.param1 == null) {
        $scope.Accion = "Nuevo Usuario"
        //inicio las variables
        $scope.persona = {};
        $scope.persona.nombre_persona = "Axel";
        $scope.persona.nombre_usuario = "Axel1";
        $scope.persona.dni_persona = "37426853";
        $scope.persona.apellido_persona = "Cores";
        $scope.persona.direccion_persona = "Calle Falsa 123";
        $scope.persona.latitud_persona = 0;
        $scope.persona.longitud_persona = 0;
        $scope.persona.foto_persona = Url + "fotos/pordefecto.png";
        $scope.persona.pass_usuario = "1234";
        $scope.persona.pass_usuario = "1234";
    } else {
        $scope.Accion = "Modificar Usuario"
        //inicio las variables
        $scope.persona = {};
        $scope.persona.nombre_persona = $stateParams.param1.nombre_usuario;
        $scope.persona.nombre_usuario = $stateParams.param1.nombre_usuario;
        $scope.persona.dni_persona = $stateParams.param1.dni_persona;
        $scope.persona.apellido_persona = $stateParams.param1.apellido_persona;
        $scope.persona.direccion_persona = $stateParams.param1.direccion_persona;
        $scope.persona.latitud_persona = $stateParams.param1.latitud_persona;
        $scope.persona.longitud_persona = $stateParams.param1.longitud_persona;
        $scope.persona.foto_persona = $stateParams.param1.foto_persona;
        $scope.persona.pass_usuario = $stateParams.param1.pass_usuario;
        $scope.persona.id_usuario = $stateParams.param1.id_usuario;
        $scope.lat = $stateParams.param1.latitud_persona;
        $scope.lng = $stateParams.param1.longitud_persona;
    }

    $scope.SubirdorArchivos.onCompleteAll = function (item, response, status, headers) {

        if ($stateParams.param1 == null) {
            $scope.persona.id_rol = $scope.objeSeleccionadoRol.id_rol;
            if ($scope.objeSeleccionadoLocal != null) {
                $scope.persona.id_local = $scope.objeSeleccionadoLocal.id_local;
            }
            fsUser.InsertarObj('User', $scope.persona)
                .then(function (respuesta) {
                    $state.go("Abm.UserGrilla");

                }, function (error) {
                    console.info(error);
                });
        } else {


            $scope.persona.id_local = $scope.objeSeleccionadoLocal.id_local;
            fsUser.ModificarObj('User', $scope.persona)
                .then(function (respuesta) {
                    $state.go("Abm.UserGrilla");

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
            $scope.persona.foto_persona = nombreFoto;
        }
        $scope.SubirdorArchivos.uploadAll();
    }

    $scope.placeMarker = function (e) {

        var marker = new google.maps.Marker({ position: e.latLng, map: $scope.map });
        $scope.map.panTo(e.latLng);
        $scope.persona.latitud_persona = e.latLng.lat();
        $scope.persona.longitud_persona = e.latLng.lng();
    }



});

miApp.controller("controllerUserGrilla", function ($scope, $state, $http, fsUser, uiGridConstants) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    $scope.Rol = fsUser.ObtenerRol();

    $scope.titulo = "Usuarios";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    if ($scope.Rol != 'ENCARGADO') {
        $scope.gridOptions.columnDefs = columnDefs();
    } else {
        $scope.gridOptions.columnDefs = columnDefsEncargado();
    }
    $scope.gridOptions.enableFiltering = true;

    fsUser.TraerTodos('User')
        .then(function (respuesta) {
            $scope.gridOptions.data = respuesta;

        }, function (error) {
            console.info(error);
        });

    function columnDefsEncargado() {
        return [
            { field: 'nombre_usuario', name: 'Usuario', enableFiltering: false },
            { field: 'nombre_persona', name: 'Nombre', enableFiltering: false },
            { field: 'apellido_persona', name: 'Apellido', enableFiltering: false },
            { field: 'direccion_persona', name: 'Dirección', enableFiltering: false },
            {
                field: 'descripcion_rol', name: 'Tipo',
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
                        { value: 'CLIENTE', label: 'CLIENTE' },
                        { value: 'EMPLEADO', label: 'EMPLEADO' },
                        { value: 'ENCARGADO', label: 'ENCARGADO' }
                    ]
                },
                cellFilter: 'rol'
            },
            { field: 'dni_persona', name: 'Dni', enableFiltering: false },
            { field: 'nombre_local', name: 'Trabajo', enableFiltering: false },
            { field: 'estado_usuario', name: 'Estado', enableFiltering: false, cellTemplate: '<div ng-if="row.entity.estado_usuario == 0">Inactivo</div/><div ng-if="row.entity.estado_usuario == 1">Activo</div/>' },
            { field: 'id_usuario', name: 'Perfil', enableFiltering: false, cellTemplate: "<button class=\"btn btn\" ng-click=\"grid.appScope.Ver(row.entity.id_usuario)\"><span class=\"glyphicon glyphicon-remove-circle\"></span>Ver</button>" },
            { field: 'id_usuario', name: 'Borrar', enableFiltering: false, cellTemplate: "<button class=\"btn btn-danger\" ng-click=\"grid.appScope.Borrar(row.entity.id_usuario)\"><span class=\"glyphicon glyphicon-remove-circle\"></span>Borrar</button>" },
            { field: 'id_usuario', name: 'Editar', enableFiltering: false, cellTemplate: "<button class=\"btn btn-warning\" ng-click=\"grid.appScope.Modificar(row.entity.id_usuario)\"><span class=\"glyphicon glyphicon-edit\"></span>Modificar</button>" },
            { field: 'id_usuario', name: 'Inhabilitar', enableFiltering: false, cellTemplate: "<button class=\"btn btn-warning\" ng-click=\"grid.appScope.Inhabilitar(row.entity.id_usuario,row.entity.estado_usuario)\"><span class=\"glyphicon glyphicon-edit\"></span>Inhabilitar</button>" }
        ];
    }

    function columnDefs() {
        return [
            { field: 'nombre_usuario', name: 'Usuario', enableFiltering: false },
            { field: 'nombre_persona', name: 'Nombre', enableFiltering: false },
            { field: 'apellido_persona', name: 'Apellido', enableFiltering: false },
            { field: 'direccion_persona', name: 'Dirección', enableFiltering: false },
            {
                field: 'descripcion_rol', name: 'Tipo',
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
                        { value: 'CLIENTE', label: 'CLIENTE' },
                        { value: 'EMPLEADO', label: 'EMPLEADO' },
                        { value: 'ENCARGADO', label: 'ENCARGADO' }
                    ]
                },
                cellFilter: 'rol'
            },
            { field: 'dni_persona', name: 'Dni', enableFiltering: false },
            { field: 'nombre_local', name: 'Trabajo', enableFiltering: false },
            { field: 'estado_usuario', name: 'Estado', enableFiltering: false, cellTemplate: '<div ng-if="row.entity.estado_usuario == 0">Inactivo</div/><div ng-if="row.entity.estado_usuario == 1">Activo</div/>' },
            { field: 'id_usuario', name: 'Perfil', enableFiltering: false, cellTemplate: "<button class=\"btn btn\" ng-click=\"grid.appScope.Ver(row.entity.id_usuario)\"><span class=\"glyphicon glyphicon-remove-circle\"></span>Ver</button>" }
        ];
    }

    $scope.Borrar = function (id) {
        fsUser.EliminarObj('User', id)
            .then(function (respuesta) {
                fsUser.TraerTodos('User')
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
        fsUser.TraerUnObj('User', id)
            .then(function (respuesta) {
                $state.go("Abm.User", { 'param1': respuesta });

            }, function (error) {
                console.info(error);
            });
    };

    $scope.Ver = function (id) {
        fsUser.TraerUnObj('User', id)
            .then(function (respuesta) {
                $state.go("Abm.UserVer", { 'param1': respuesta });

            }, function (error) {
                console.info(error);
            });
    };

    $scope.Inhabilitar = function (id, estado) {
        if (estado == 1) {
            estado = 0;
        } else {
            estado = 1;
        }
        fsUser.ModificarObj('UserEstado', { 'id': id, 'estado': estado })
            .then(function (respuesta) {
                fsUser.TraerTodos('User')
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

miApp.controller("controllerUserVer", function ($scope, $state, $stateParams, fsUser) {
    if (!fsUser.VerificarLogin() && fsUser.ObtenerRol() != "ADMINISTRADOR")
        $state.go('Pizzeria.Principal');

    if ($stateParams.param1 != null) {
        $scope.persona = {};
        $scope.persona.nombre_persona = $stateParams.param1.nombre_usuario;
        $scope.persona.nombre_usuario = $stateParams.param1.nombre_usuario;
        $scope.persona.dni_persona = $stateParams.param1.dni_persona;
        $scope.persona.apellido_persona = $stateParams.param1.apellido_persona;
        $scope.persona.direccion_persona = $stateParams.param1.direccion_persona;
        $scope.persona.latitud_persona = $stateParams.param1.latitud_persona;
        $scope.persona.longitud_persona = $stateParams.param1.longitud_persona;
        $scope.persona.foto_persona = $stateParams.param1.foto_persona;
        $scope.persona.pass_usuario = $stateParams.param1.pass_usuario;
        $scope.persona.id_usuario = $stateParams.param1.id_usuario;
    } else {
        $state.go('Abm.UserGrilla');
    }

});

miApp.controller("controllerUserEmpleo", function ($scope, $state, $http, fsUser) {
    if (!fsUser.VerificarLogin() && fsUser.ObtenerRol() != "ADMINISTRADOR")
        $state.go('Pizzeria.Principal');
    $scope.Titulo = "Asignación de Personal";
    $scope.Rol = fsUser.ObtenerRol();
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
            var auxiliar = [{}];
            respuesta.forEach(function (item) {
                if (item.descripcion_rol == "ENCARGADO" || item.descripcion_rol == "EMPLEADO") {
                    auxiliar.push(item);
                }

            })
            $scope.itemsSelectUser = auxiliar;
        }, function (error) {
            console.info(error);
        });

    $scope.Guardar = function () {
        var id_new = {};
        if ($scope.objeSeleccionadoUser.id_local != null) {
            var id_old = {};
            id_old.id_local = $scope.objeSeleccionadoUser.id_local;
            id_old.id_rol = $scope.objeSeleccionadoUser.id_rol;
            fsUser.TraerUnObj('UserValidacionEmpleo', id_old)
                .then(function (respuesta) {
                    if ($scope.objeSeleccionadoUser.descripcion_rol == "ENCARGADO") {
                        if (respuesta.length <= 1) {
                            $scope.Result = "No se puede dejar un local sin Encargado. ";
                            return
                        }
                    }
                    if ($scope.objeSeleccionadoUser.descripcion_rol == "EMPLEADO") {
                        if (respuesta.length <= 2) {
                            $scope.Result = "No se puede dejar un local con menos de dos Empleados. ";
                            return
                        }
                    }
                }, function (error) {
                    console.info(error);
                });
        }

        id_new.id_local = $scope.objeSeleccionadoLocal.id_local;
        id_new.id_usuario = $scope.objeSeleccionadoUser.id_usuario;
        fsUser.ModificarObj('UserLocal', id_new)
            .then(function (respuesta) {
                $scope.Result = "Se ha asignado el Empleado " + $scope.objeSeleccionadoUser.nombre_persona + " al local " + $scope.objeSeleccionadoLocal.nombre_local;
            }, function (error) {
                console.info(error);
            });
    }



});


