<?php
include_once './../vendor/autoload.php';
require_once './../../User.php';

use \Firebase\JWT\JWT;
$DatosPorPost = file_get_contents("php://input");
$usuario = json_decode($DatosPorPost);
$objUser = User::Login($usuario);

if(!is_null($objUser) && !empty($objUser))
{
	$ClaveDeEncriptacion="estaeslaclave";
	$token["usuario"]=$objUser;
	$token["iat"]=time();
	$token["exp"]=time() + 600;
	$jwt = JWT::encode($token, $ClaveDeEncriptacion);
}
else
{
	$jwt = false;
}
$ArrayConToken["TokenNamePizzeria"]=$jwt;
echo json_encode($ArrayConToken);
?>