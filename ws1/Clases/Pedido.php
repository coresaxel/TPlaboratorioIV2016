<?php
require_once"AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_promo;
	public $precio_promo;
 	public $id_pizza;
	public $descripcion_pizza;
  	public $id_local;
	public $nombre_local;
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerTodasLosPedidos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select * FROM pedido");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");	
		return $arrPersonas;
	}
	
    public static function InsertarPedido($promocion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into promocion ( precio_promo, id_pizza, id_local) 
		VALUES (:precio_promo,:id_pizza,:id_local)");
		$consulta->bindValue(':precio_promo',$promocion->precio_promo, PDO::PARAM_STR);
		$consulta->bindValue(':id_pizza',$promocion->id_pizza, PDO::PARAM_INT);
		$consulta->bindValue(':id_local', $promocion->id_local, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	
    
	public static function BorrarPedido($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from pedido WHERE id_pedido =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
}
