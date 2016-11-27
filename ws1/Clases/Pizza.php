<?php
require_once"AccesoDatos.php";
class Pizza
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_pizza;
	public $descripcion_pizza;
 	public $precio_pizza;
  	public $foto_pizza;
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaPizza($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id_pizza,descripcion_pizza, precio_pizza,foto_pizza FROM pizza where id_pizza =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Pizza');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLasPizzas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select id_pizza, descripcion_pizza,precio_pizza,foto_pizza FROM pizza");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Pizza");	
		return $arrPersonas;
	}
	
    public static function InsertarPizza($Pizza)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into pizza ( descripcion_pizza, precio_pizza, foto_pizza) 
		VALUES (:descripcion_pizza,:precio_pizza,:foto_pizza)");
		$consulta->bindValue(':descripcion_pizza',$Pizza->descripcion_pizza, PDO::PARAM_STR);
		$consulta->bindValue(':precio_pizza',$Pizza->precio_pizza, PDO::PARAM_INT);
		$consulta->bindValue(':foto_pizza', $Pizza->foto_pizza, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	

	public static function ModificarPizza($Pizza)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("update pizza set descripcion_pizza=:descripcion_pizza, precio_pizza=:precio_pizza, foto_pizza=:foto_pizza WHERE id_pizza=:id");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta->bindValue(':id',$Pizza->id_pizza, PDO::PARAM_INT);
		$consulta->bindValue(':descripcion_pizza',$Pizza->descripcion_pizza, PDO::PARAM_STR);
		$consulta->bindValue(':foto_pizza', $Pizza->foto_pizza, PDO::PARAM_STR);
		$consulta->bindValue(':precio_pizza', $Pizza->precio_pizza, PDO::PARAM_INT);
		return $consulta->execute();
	}
    
	public static function BorrarPizza($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from pizza WHERE id_pizza =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
}
