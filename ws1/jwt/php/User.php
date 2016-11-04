<?php
require_once __DIR__ . '\AccesoDatos.php';
class Autenticador{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_usuario;
	public $nombre_usuario;
 	public $pass_usuario;
  	public $descripcion_rol;

//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id_usuario;
	}
	public function GetName()
	{
		return $this->nombre_usuario;
	}
	public function GetPass()
	{
		return $this->pass_usuario;
	}
	public function GetRol()
	{
		return $this->descripcion_rol;
	}
	public function SetName($valor)
	{
		$this->nombre_usuario = $valor;
	}
	public function SetPass($valor)
	{
		$this->pass_usuario = $valor;
	}
	public function SetRol($valor)
	{
		$this->descripcion_rol = $valor;
	}
	
//--------------------------------------------------------------------------------//
	public static function Login($usuario){
		return Autenticador::Validar($usuario->name,$usuario->pass);
	}

	private static function Validar($user_name,$user_pass){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select u.id_usuario, u.nombre_usuario, u.pass_usuario, r.descripcion_rol from usuario as u join rol r on r.id_rol = u.id_rol where u.nombre_usuario = :p_nombre AND u.pass_usuario = :p_pass");
		$consulta->bindValue(':p_nombre',$user_name, PDO::PARAM_STR);
		$consulta->bindValue(':p_pass',$user_pass, PDO::PARAM_STR);
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Autenticador");	
		return $arrPersonas;
	}
}
?>
