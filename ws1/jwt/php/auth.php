<?php
include_once __DIR__ . '\..\vendor\autoload.php';
require_once __DIR__ . '\User.php';

use \Firebase\JWT\JWT;
$DatosPorPost = file_get_contents("php://input");
$usuario = json_decode($DatosPorPost);
$objUser = Autenticador::Login($usuario);

if(Count($objUser) != 0)
{
	$ClaveDeEncriptacion="estaeslaclave";
	//$key = "1234";
	$token["usuario"]=$objUser;
	//$token['id_usuario']=$objUser->id_usuario;
	//$token["rol"]=$objUser->descripcion_rol;
	$token["iat"]=time();//momento de creacion
	$token["exp"]=time() + 60000;
	$jwt = JWT::encode($token, $ClaveDeEncriptacion);
}
else
{
	$jwt = usuario;
}
$ArrayConToken["TokenNamePizzeria"]=$jwt;
echo json_encode($ArrayConToken);
?>