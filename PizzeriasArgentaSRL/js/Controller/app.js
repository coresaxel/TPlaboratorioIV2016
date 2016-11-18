var miApp = angular.module("AngularABM", ["ui.router", "angularFileUpload", 'satellizer', 'ui.grid', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit']);
//var Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/';
var Url = 'http://labivaxel.esy.es/ws1/';


miApp.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
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
			cache: true
		})
		.state(
		"Pizzeria.Principal", {
			cache: true,
			url: "/",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/User/presentacion.html"
				}
			}
		})
		.state(
		"Abm", {
			url: "/Abm",
			abstract: true,
			templateUrl: "./Templates/Abstractas/pep.html",
			cache: true
		})
		.state(
		"Abm.User", {
			cache: true,
			url: "/User",
			params: {
				param1: null
			},
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/User/AltaUser.html",
					controller: "controllerUser"
				}
			}
		})
		.state(
		"Abm.UserGrilla", {
			cache: true,
			url: "/Usuarios",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Grilla/Grilla.html",
					controller: "controllerUserGrilla"
				}
			}
		})
		.state(
		"Abm.Local", {
			cache: true,
			url: "/Local",
			params: {
				param1: null
			},
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Local/AltaLocal.html",
					controller: "controllerLocal"
				}
			}
		})
		.state(
		"Abm.LocalGrilla", {
			cache: true,
			url: "/Locales",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Grilla/Grilla.html",
					controller: "controllerLocales"
				}
			}
		})
		.state(
		"Abm.Pizza", {
			cache: true,
			url: "/Pizza",
			params: {
				param1: null
			},
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Pizza/AltaPizza.html",
					controller: "controllerPizza"
				}
			}
		})
		.state(
		"Abm.PizzaGrilla", {
			cache: true,
			url: "/Pizzas",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Grilla/Grilla.html",
					controller: "controllerPizzas"
				}
			}
		})
		.state(
		"Abm.Promocion", {
			cache: true,
			url: "/Promocion",
			params: {
				param1: null
			},
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Promocion/AltaPromocion.html",
					controller: "controllerPromocion"
				}
			}
		})
		.state(
		"Abm.PromocionGrilla", {
			cache: true,
			url: "/Promociones",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Grilla/Grilla.html",
					controller: "controllerPromociones"
				}
			}
		})
		.state(
		"Abm.Pedido", {
			cache: true,
			url: "/Pedido",
			params: {
				param1: null
			},
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Pedido/AltaPedido.html",
					controller: "controllerPedido"
				}
			}
		})
		.state(
		"Abm.PedidoGrilla", {
			cache: true,
			url: "/Pedidos",
			views:
			{
				"contenido":
				{
					templateUrl: "./Templates/User/UserBarra.html",
					controller: "controllerLogin"
				},
				"contenidoBody":
				{
					templateUrl: "./Templates/Grilla/Grilla.html",
					controller: "controllerPedidos"
				}
			}
		});


	$urlRouterProvider.otherwise("Pizzeria/");

});

