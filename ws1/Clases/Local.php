<?php
require_once"AccesoDatos.php";
class Local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_local;
	public $nombre_local;
 	public $direccion_local;
  	public $latitud_local;
  	public $longitud_local;
	public $foto_local;
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnLocal($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id_local, nombre_local, direccion_local, latitud_local, longitud_local, foto_local from local where id_local =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Local');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLosLocal()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select id_local, nombre_local, direccion_local, latitud_local, longitud_local, foto_local from local");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Local");	
		return $arrPersonas;
	}
	
    public static function InsertarLocal($Local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into local ( nombre_local, direccion_local, latitud_local, longitud_local, foto_local) 
		VALUES (:nombre_local,:direccion_local,:latitud_local,:longitud_local,:foto_local)");
		$consulta->bindValue(':nombre_local',$Local->nombre_local, PDO::PARAM_STR);
		$consulta->bindValue(':direccion_local', $Local->direccion_local, PDO::PARAM_STR);
		$consulta->bindValue(':latitud_local', $Local->latitud_local, PDO::PARAM_INT);
		$consulta->bindValue(':longitud_local', $Local->longitud_local, PDO::PARAM_INT);
		$consulta->bindValue(':foto_local', $Local->foto_local, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	

	public static function ModificarLocal($Local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("update local set nombre_local=:nombre_local, direccion_local=:direccion_local, latitud_local=:latitud_local, longitud_local=:longitud_local, foto_local=:foto_local WHERE id_local=:id");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta->bindValue(':id',$Local->id_local, PDO::PARAM_INT);
		$consulta->bindValue(':nombre_local',$Local->nombre_local, PDO::PARAM_STR);
		$consulta->bindValue(':direccion_local', $Local->direccion_local, PDO::PARAM_STR);
		$consulta->bindValue(':latitud_local', $Local->latitud_local, PDO::PARAM_INT);
		$consulta->bindValue(':longitud_local', $Local->longitud_local, PDO::PARAM_INT);
		$consulta->bindValue(':foto_local', $Local->foto_local, PDO::PARAM_STR);
		return $consulta->execute();
	}
    
	public static function BorrarLocal($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from local WHERE id_local =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	


//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//


//--------------------------------------------------------------------------------//

}
