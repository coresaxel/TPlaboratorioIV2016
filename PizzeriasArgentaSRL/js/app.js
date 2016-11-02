var miApp = angular.module("AngularABM",["ui.router","angularFileUpload",'satellizer']);
var Url = 'http://localhost:8080/Laboratorio-IV-2016/Clase.09/Clase.07/ws1/';


miApp.config(function($stateProvider,$urlRouterProvider,$authProvider){
$authProvider.loginUrl = 'Clase.06/CLASE5-master/ABM_PERSONA/servidor/jwt/php/auth.php';
$authProvider.tokenName = 'TokenNameAxelCores';
$authProvider.tokenPrefix = 'AngularABM';
$authProvider.authHeader = 'data';

	$stateProvider
		.state(
			"inicio",{
				url: "/inicio",
				templateUrl: "inicio.html",
				cache: true
			})
		.state(
			"Test",{
				url:"/Test",
				templateUrl:"./Templates/User/UserBarra.html"

			})
			.state(
			"persona",{
				url:"/persona",
				abstract:true,
				templateUrl:"./AbmPersona/abstractaPersona.html",
				controller:"controlPersonaMenu"

			})
			.state(
			"persona.menu",{
				url:"/menu",
				cache: true,
				views: {
					"contenido":{
					templateUrl:"./AbmPersona/personaMenu.html",
					controller:"controlPersonaMenu"
					}
				}
			})	.state(
			"persona.Alta",{
				url:"/alta",
				cache: true,
				views: {
					"contenido":{
					templateUrl:"./AbmPersona/personaAlta.html",
					controller:"controlPersonaAlta"
						}
				}
			}).state(
			"persona.Grilla",{
				url:"/grilla",
				cache: true,
				views: {
					"contenido":{
					templateUrl:"./AbmPersona/personaGrilla.html",
					controller:"controlPersonaGrilla"
						}
				}
			}).state(
			'persona.modificacion',{
				url: '/modificacion/{id}?:nombre:apellido:dni:foto',
				cache: true,
				views: {
					"contenido":{
						templateUrl: './AbmPersona/personaModificar.html',
						controller: 'controlModificacion'
					}
				}});

		$urlRouterProvider.otherwise("/inicio");

});

