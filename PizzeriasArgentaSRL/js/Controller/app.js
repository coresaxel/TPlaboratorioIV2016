var miApp = angular.module("AngularABM",["ui.router","angularFileUpload",'satellizer','ui.grid','ui.grid.pagination','ui.grid.resizeColumns','ui.grid.selection', 'ui.grid.exporter','ui.grid.edit']);
var Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/';


miApp.config(function($stateProvider,$urlRouterProvider,$authProvider){
$authProvider.loginUrl = Url + 'jwt/php/auth.php';
$authProvider.tokenName = 'TokenNamePizzeria';
$authProvider.tokenPrefix = 'AngularABM';
$authProvider.authHeader = 'data';

	$stateProvider
	.state(
			"Pizzeria",{
				url:"/Pizzeria",
				abstract: true,
				templateUrl: "./Templates/Abstractas/pep.html",
				cache: true
			})
		.state(
			"Pizzeria.Principal",{
				cache: true,
				url:"/",
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
			"Abm",{
				url:"/Abm",
				abstract: true,
				templateUrl: "./Templates/Abstractas/pep.html",
				cache: true
			})
			.state(
			"Abm.User",{
				cache: true,
				url:"/User",
				params: {
					param1: null
				},
				views:
				{
					// "contenido":
					// {
					// 	templateUrl: "./Templates/User/UserBarra.html",
					// 	controller: "controllerLogin"
					// },
					"contenidoBody":
					{
						templateUrl: "./Templates/User/AltaUser.html",
						controller: "controllerUser"
					}
				}
			})
			.state(
			"Abm.UserGrilla",{
				cache: true,
				url:"/Usuarios",
				views:
				{
					// "contenido":
					// {
					// 	templateUrl: "./Templates/User/UserBarra.html",
					// 	controller: "controllerLogin"
					// },
					"contenidoBody":
					{
						templateUrl: "./Templates/Grilla/Grilla.html",
						controller: "controllerUserGrilla"
					}
				}
			});


		$urlRouterProvider.otherwise("Pizzeria/");

});

