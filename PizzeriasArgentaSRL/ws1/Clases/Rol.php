<?php
require_once"AccesoDatos.php";
class Rol
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_rol;
  	public $descripcion_rol;
	
	public static function TraerTodosLosRoles()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id_rol,descripcion_rol from rol");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Rol");	
		return $arrPersonas;
	}
}
