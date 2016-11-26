<?php
include_once './../vendor/autoload.php';
require_once './../../Clases/User.php';

use \Firebase\JWT\JWT;
$DatosPorPost = file_get_contents("php://input");
$usuario = json_decode($DatosPorPost);
$objUser = User::Login($usuario);

if(Count($objUser) != 0)
{
	$ClaveDeEncriptacion="estaeslaclave";
	$token["usuario"]=$objUser;
	$token["iat"]=time();
	$token["exp"]=time() + 600;
	$jwt = JWT::encode($token, $ClaveDeEncriptacion);
}
else
{
	$jwt = usuario;
}
$ArrayConToken["TokenNamePizzeria"]=$jwt;
echo json_encode($ArrayConToken);
?>