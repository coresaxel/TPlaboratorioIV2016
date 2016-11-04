miApp.controller("controllerLogin",function($scope,$state,$auth,services){
	if($auth.isAuthenticated()){
		$scope.UserName = ($auth.getPayload()).usuario[0].nombre_usuario;
	}
	
	$scope.Test = function(rol){
		switch(rol){
			case 'Admin':
				$scope.FormIngreso.a_user="AdminArgento";
				$scope.FormIngreso.a_pass="1234";

			break;
			case 'Empleado':
				$scope.FormIngreso.a_user="EmpleadoArgento";
				$scope.FormIngreso.a_pass="1234";
			break;
			case 'Cliente':
				$scope.FormIngreso.a_user="PepeArgento";
				$scope.FormIngreso.a_pass="1234";
			break;
		}

	}

	$scope.Login = function(){
		user = {};
		user.name = $scope.FormIngreso.a_user;
		user.pass = $scope.FormIngreso.a_pass;
		
		services.TraerLogin(user)
  		.then(function(response) {
	  		if($auth.isAuthenticated()){
	  			$scope.FormIngreso.UserName = $scope.FormIngreso.a_user;
				$state.go("Pizzeria");
			}
	  	})
  		.catch(function(response) {
    		console.info("error",response);
  		});
	}

	

	$scope.Logout = function(){
		$scope.UserName = "";
		$auth.logout();
	}


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