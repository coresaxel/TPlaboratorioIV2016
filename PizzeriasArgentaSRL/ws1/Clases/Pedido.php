<?php
require_once"AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_pedido;
	public $id_user;
	public $nombre_usuario;
 	public $id_pizza;
	public $descripcion_pizza;
	public $id_local;
	public $nombre_local;
  	public $cantidad_pizza;
	public $estado_pedido;
	public $fecha_entrega;
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerTodasLosPedidos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	    $consulta =$objetoAccesoDato->RetornarConsulta("select pedido.id_pedido, pedido.id_user, pedido.id_pizza, pedido.id_local, pedido.cantidad_pizza, pedido.estado_pedido, pedido.fecha_entrega, usuario.nombre_usuario, pizza.descripcion_pizza, local.nombre_local " 
		. " FROM pedido JOIN local ON pedido.id_local = local.id_local JOIN pizza ON pedido.id_pizza = pizza.id_pizza JOIN usuario ON pedido.id_user = usuario.id_usuario");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");	
		return $arrPersonas;
	}
	
    public static function InsertarPedido($promocion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into pedido (id_user, id_pizza, id_local, cantidad_pizza, estado_pedido, fecha_entrega) 
		VALUES (:id_user,:id_pizza,:id_local,:cantidad_pizza,0,:fecha_entrega)");
		$consulta->bindValue(':id_user',$promocion->id_user, PDO::PARAM_STR);
		$consulta->bindValue(':id_pizza',$promocion->id_pizza, PDO::PARAM_INT);
		$consulta->bindValue(':id_local', $promocion->id_local, PDO::PARAM_STR);
		$consulta->bindValue(':cantidad_pizza',$promocion->cantidad_pizza, PDO::PARAM_INT);
		$consulta->bindValue(':fecha_entrega', ($promocion->fecha_entrega), PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	
    
	public static function ModificarPedido($promocion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("update pedido set estado_pedido = 1 WHERE id_pedido=:id");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta->bindValue(':id',$promocion, PDO::PARAM_INT);
		return $consulta->execute();
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
