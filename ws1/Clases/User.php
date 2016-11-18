<?php
require_once"AccesoDatos.php";
class User
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_usuario;
	public $nombre_usuario;
 	public $pass_usuario;
  	public $descripcion_rol;
  	public $nombre_persona;
	public $apellido_persona;
	public $dni_persona;
	public $direccion_persona;
	public $latitud_persona;
	public $longitud_persona;
	public $foto_persona;
	public $nombre_local;
//--------------------------------------------------------------------------------//

//--METODO DE CLASE
	public static function TraerUnaPersona($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select u.id_usuario,u.nombre_usuario, u.pass_usuario, r.descripcion_rol, u.nombre_persona,u.apellido_persona, u.dni_persona, u.direccion_persona, u.latitud_persona, u.longitud_persona, u.foto_persona,l.nombre_local from usuario u join rol r on u.id_rol = r.id_rol left join local l ON u.id_local = l.id_local where id_usuario =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('User');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
	$consulta =$objetoAccesoDato->RetornarConsulta("select u.id_usuario,u.nombre_usuario, u.pass_usuario, r.descripcion_rol, u.nombre_persona,u.apellido_persona, u.dni_persona, u.direccion_persona, u.latitud_persona, u.longitud_persona, u.foto_persona from usuario u join rol r on u.id_rol = r.id_rol");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "User");	
		return $arrPersonas;
	}
	
	public static function BorrarPersona($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from usuario WHERE id_usuario =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPersona($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("update usuario set pass_usuario=:userPass,nombre_persona=:name,apellido_persona=:apellido, 
		dni_persona=:dni,direccion_persona=:dir,latitud_persona=:lat, longitud_persona=:long, foto_persona=:foto WHERE id_usuario=:id");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta->bindValue(':id',$persona->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':userPass', $persona->pass_usuario, PDO::PARAM_STR);
		$consulta->bindValue(':name', $persona->nombre_persona, PDO::PARAM_STR);
		$consulta->bindValue(':apellido', $persona->apellido_persona, PDO::PARAM_STR);
		$consulta->bindValue(':dni', $persona->dni_persona, PDO::PARAM_STR);
		$consulta->bindValue(':dir',$persona->direccion_persona, PDO::PARAM_STR);
		$consulta->bindValue(':lat', $persona->latitud_persona, PDO::PARAM_INT);
		$consulta->bindValue(':long', $persona->longitud_persona, PDO::PARAM_INT);
		$consulta->bindValue(':foto', $persona->foto_persona, PDO::PARAM_STR);
		return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPersona($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into usuario ( nombre_usuario, pass_usuario, id_rol, nombre_persona, apellido_persona, dni_persona, direccion_persona, latitud_persona, longitud_persona, foto_persona) 
		VALUES (:userName,:userPass,:idRol,:name,:apellido,:dni,:dir,:lat,:long,:foto)");
		$consulta->bindValue(':userName',$persona->nombre_usuario, PDO::PARAM_STR);
		$consulta->bindValue(':userPass', $persona->pass_usuario, PDO::PARAM_STR);
		$consulta->bindValue(':idRol', 3, PDO::PARAM_INT);
		$consulta->bindValue(':name', $persona->nombre_persona, PDO::PARAM_STR);
		$consulta->bindValue(':apellido', $persona->apellido_persona, PDO::PARAM_STR);
		$consulta->bindValue(':dni', $persona->dni_persona, PDO::PARAM_STR);
		$consulta->bindValue(':dir',$persona->direccion_persona, PDO::PARAM_STR);
		$consulta->bindValue(':lat', 0, PDO::PARAM_INT);
		$consulta->bindValue(':long', 0, PDO::PARAM_INT);
		$consulta->bindValue(':foto', $persona->foto_persona, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	
//--------------------------------------------------------------------------------//

}
