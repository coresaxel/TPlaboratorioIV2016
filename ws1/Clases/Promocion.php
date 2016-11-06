<?php
require_once"accesoDatos.php";
class Promocion
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_pizza;
	public $descripcion_pizza;
 	public $precio_pizza;
  	public $foto_pizza;
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
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
    
	public static function BorrarPizza($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from pizza WHERE id_pizza =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
}
