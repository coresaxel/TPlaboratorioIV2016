var miApp = angular.module("AngularABM", ["ui.router", "angularFileUpload", 'satellizer',
    'ui.grid', 'ui.grid.pagination', 'ui.grid.resizeColumns',
    'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit',
    'ngMap', 'ui.bootstrap']);

miApp.config(function($stateProvider, $urlRouterProvider, $authProvider) {

    var Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/';
    //var Url = 'http://labivaxel.esy.es/ws1/';

    $authProvider.loginUrl = Url + 'jwt/php/auth.php';
    $authProvider.tokenName = 'TokenNamePizzeria';
    $authProvider.tokenPrefix = 'AngularABM';
    $authProvider.authHeader = 'data';

    $stateProvider
        .state(
        "Pizzeria", {
            url: "/Pizzeria",
            abstract: true,
            templateUrl: "./Templates/Abstractas/pep.html",
            cache: false
        })
        .state(
        "Pizzeria.Principal", {
            cache: false,
            url: "/",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/User/presentacion.html",
                    cache: false
                }
            }
        })
        .state(
        "Abm", {
            url: "/Abm",
            abstract: true,
            templateUrl: "./Templates/Abstractas/pep.html",
            cache: false
        })
        .state(
        "Abm.User", {
            cache: false,
            url: "/User",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/User/AltaUser.html",
                    controller: "controllerUser",
                    cache: false
                }
            }
        })
        .state(
        "Abm.UserVer", {
            cache: false,
            url: "/UserVer",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/User/User.html",
                    controller: "controllerUserVer",
                    cache: false
                }
            }
        })
        .state(
        "Abm.UserGrilla", {
            cache: false,
            url: "/Usuarios",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Grilla/Grilla.html",
                    controller: "controllerUserGrilla",
                    cache: false
                }
            }
        })
        .state(
        "Abm.LocalEmpleo", {
            cache: false,
            url: "/LocalEmpleo",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/User/Empleo.html",
                    controller: "controllerUserEmpleo",
                    cache: false
                }
            }
        })
        .state(
        "Abm.Local", {
            cache: false,
            url: "/Local",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Local/AltaLocal.html",
                    controller: "controllerLocal",
                    cache: false
                }
            }
        })
        .state(
        "Abm.LocalGrilla", {
            cache: false,
            url: "/Locales",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Grilla/Grilla.html",
                    controller: "controllerLocales",
                    cache: false
                }
            }
        })
        .state(
        "Abm.LocalVer", {
            cache: false,
            url: "/LocalVer",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Local/Local.html",
                    controller: "controllerLocalVer",
                    cache: false
                }
            }
        })
        .state(
        "Abm.Pizza", {
            cache: false,
            url: "/Pizza",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Pizza/AltaPizza.html",
                    controller: "controllerPizza",
                    cache: false
                }
            }
        })
        .state(
        "Abm.PizzaGrilla", {
            cache: false,
            url: "/Pizzas",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Grilla/Grilla.html",
                    controller: "controllerPizzas",
                    cache: false
                }
            }
        })
        .state(
        "Abm.PizzaVer", {
            cache: false,
            url: "/PizzaVer",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Pizza/Pizza.html",
                    controller: "controllerPizzaVer",
                    cache: false
                }
            }
        })
        .state(
        "Abm.Promocion", {
            cache: false,
            url: "/Promocion",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Promocion/AltaPromocion.html",
                    controller: "controllerPromocion",
                    cache: false
                }
            }
        })
        .state(
        "Abm.PromocionGrilla", {
            cache: false,
            url: "/Promociones",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Grilla/Grilla.html",
                    controller: "controllerPromociones",
                    cache: false
                }
            }
        })
        .state(
        "Abm.Pedido", {
            cache: false,
            url: "/Pedido",
            params: {
                param1: null
            },
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Pedido/AltaPedido.html",
                    controller: "controllerPedido",
                    cache: false
                }
            }
        })
        .state(
        "Abm.PedidoGrilla", {
            cache: false,
            url: "/Pedidos",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Grilla/Grilla.html",
                    controller: "controllerPedidos",
                    cache: false
                }
            }
        }).state(
        "Abm.Acerca", {
            cache: false,
            url: "/About",
            views:
            {
                "contenido":
                {
                    templateUrl: "./Templates/User/UserBarra.html",
                    controller: "controllerLogin",
                    cache: false
                },
                "contenidoBody":
                {
                    templateUrl: "./Templates/Informacion/Info.html",
                    controller: "controllerPedido",
                    cache: false
                }
            }
        });


    $urlRouterProvider.otherwise("Pizzeria/");

});

