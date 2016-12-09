<?php
require_once"AccesoDatos.php";
class Promocion
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
	public static function TraerTodasLasPromociones()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select pr.id_promo, pr.precio_promo,  pi.id_pizza, pi.descripcion_pizza, l.id_local, l.nombre_local FROM promocion pr join pizza pi on pr.id_pizza = pi.id_pizza join local l on pr.id_local = l.id_local");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Promocion");	
		return $arrPersonas;
	}
	
    public static function InsertarPromocion($promocion)
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
    
	public static function BorrarPromocion($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("delete from promocion WHERE id_promo =:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
}
