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


miApp.controller("controlPersonaMenu",function($scope,$state,abmPersonaServicio){
console.info(abmPersonaServicio);	
	$scope.IraMenu = function(){
		$state.go("persona.menu");
	}


	$scope.IraAlta = function(){
		$state.go("persona.Alta");
	}

	$scope.IraGrilla = function(){
		$state.go("persona.Grilla");
	}

});

miApp.controller("controlPersonaAlta",function($scope,$state,FileUploader,$http,abmPersonaServicio){
	
//inicio las variables
	$scope.SubirdorArchivos = new FileUploader({url: Url +'archivos'});  
	$scope.persona={};
  	$scope.persona.nombre= "natalia" ;
  	$scope.persona.dni= "1" ;
  	$scope.persona.apellido= "natalia" ;
  	$scope.persona.foto="pordefecto.png";
  	$scope.persona.foto=Url + "fotos/pordefecto.png";


	$scope.SubirdorArchivos.onCompleteAll = function(item, response, status, headers) {


	abmPersonaServicio.InsertarObjeto($scope.persona)
 	.then(function(respuesta) {   	
 		$state.go("persona.Grilla");

    },function(error){
        console.info(error);
      });
           
	}
  $scope.Guardar=function(){
	if($scope.SubirdorArchivos.queue != undefined)
	{
		var nombreFoto="";
		for (i in $scope.SubirdorArchivos.queue) {
			if(nombreFoto != "")
				nombreFoto = nombreFoto + ";" +($scope.SubirdorArchivos.queue[i]._file.name);
			else
				nombreFoto = ($scope.SubirdorArchivos.queue[i]._file.name);
		}
		$scope.persona.foto=nombreFoto;
		//console.log($scope.persona.foto);
	}
	$scope.SubirdorArchivos.uploadAll();
  }
});




miApp.controller("controlPersonaGrilla",function($scope,$state,$http,abmPersonaServicio){

	abmPersonaServicio.TraerTodos()
 	.then(function(respuesta) {   	
 		//console.info(respuesta);
      	 $scope.ListadoPersonas = respuesta;

    },function(error){
        console.info(error);
      });

 	
 	$scope.Borrar=function(persona){

	abmPersonaServicio.BorrarObjeto(persona.id)
 	.then(function(respuesta) {   	
 		console.info(respuesta);
      	 $scope.ListadoPersonas = respuesta;

    },function(error){
        console.info(error);
      });

 	}


$scope.Modificar=function(persona)
	{
		$state.go("persona.modificacion", persona);
	};

});


miApp.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader,abmPersonaServicio)//, $routeParams, $location)
{
	$scope.persona={};
	$scope.DatoTest="**Modificar**";
	$scope.SubirdorArchivos = new FileUploader({url:Url + 'archivos'});  
	$scope.persona.id=$stateParams.id;
	$scope.persona.nombre=$stateParams.nombre;
	$scope.persona.apellido=$stateParams.apellido;
	$scope.persona.dni=$stateParams.dni;
	$scope.persona.foto=$stateParams.foto;

	$scope.SubirdorArchivos.onSuccessItem=function(item, response, status, headers)
	{
		abmPersonaServicio.ModificarObjeto($scope.persona)
		.then(function(respuesta) {   	
 			$state.go("persona.Grilla");

		},function(error){
        console.info(error);
      });
		
	};

	$scope.Modificar=function(persona)
	{
	
		if($scope.SubirdorArchivos.queue[0]!=undefined)
		{
			var nombreFoto = $scope.SubirdorArchivos.queue[0]._file.name;
			$scope.persona.foto=nombreFoto;
		}
		$scope.SubirdorArchivos.uploadAll();
	}

});