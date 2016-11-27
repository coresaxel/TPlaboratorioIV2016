<?php
require_once('./Clases/AccesoDatos.php');
require_once('./Clases/User.php');
require_once('./Clases/Local.php');
require_once('./Clases/Pizza.php');
require_once('./Clases/Promocion.php');
require_once('./Clases/Pedido.php');
require './vendor/autoload.php';

function Url(){
    if($_SERVER['SERVER_NAME'] == "localhost"){
        return 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/fotos/';
    }else{
        return 'http://labivaxel.esy.es/ws1/fotos/';        
    }
}

$configuration = ['settings' => ['displayErrorDetails' => true,],];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

$app->post('/archivos', function ($request, $response, $args) {
    
    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = "fotos" . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
    } else {
        echo 'No files';
    }
    return $response;
});

//***********************************USER********************************//
/*  GET: Para consultar y leer recursos */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim! " );
    return $response;
});

$app->get('/User', function ($request, $response, $args) {
    $datos=User::TraerTodasLasPersonas();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto_persona=json_decode($datos[$i]->foto_persona);
    }
    return $response->write(json_encode($datos));
});

$app->get('/User/{objeto}', function ($request, $response, $args) {
    $id=json_decode($args['objeto']);
    $datos=User::TraerUnaPersona($id);
    $datos->foto_persona=json_decode($datos->foto_persona);
    return $response->write(json_encode($datos));
});

/* POST: Para crear recursos */
$app->post('/User/{objeto}', function ($request, $response, $args) {
    
    $persona=json_decode($args['objeto']);
    $persona->foto_persona=explode(';',$persona->foto_persona);
    $arrayFoto = array();
    if(count($persona->foto_persona) > 0){
        for ($i = 0; $i < count($persona->foto_persona); $i++ ){
            $rutaVieja="fotos/".$persona->foto_persona[$i];
            $rutaNueva=$persona->dni_persona. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= Url() .$rutaNueva;
        } 
        $persona->foto_persona=json_encode($arrayFoto); 
    }
    return $response->write(User::InsertarPersona($persona)); 
});

// /* PUT: Para editar recursos */
$app->put('/User/{objeto}', function ($request, $response, $args) {
    $persona=json_decode($args['objeto']);
    $persona->foto_persona=explode(';',$persona->foto_persona);
    $arrayFoto = array();
    if(count($persona->foto_persona) > 0){
        for ($i = 0; $i < count($persona->foto_persona); $i++ ){
            $rutaVieja="fotos/".$persona->foto_persona[$i];
            $rutaNueva=$persona->dni_persona. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= Url().$rutaNueva;
        } 
        $persona->foto_persona=json_encode($arrayFoto); 
    }
    return $response->write(User::ModificarPersona($persona));

});

// /* PUT: Para editar recursos */
$app->put('/UserEstado/{objeto}', function ($request, $response, $args) {
    $persona=json_decode($args['objeto']);
    $persona->foto_persona=explode(';',$persona->foto_persona);
    $arrayFoto = array();
    if(count($persona->foto_persona) > 0){
        for ($i = 0; $i < count($persona->foto_persona); $i++ ){
            $rutaVieja="fotos/".$persona->foto_persona[$i];
            $rutaNueva=$persona->dni_persona. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= Url().$rutaNueva;
        } 
        $persona->foto_persona=json_encode($arrayFoto); 
    }
    return $response->write(User::ModificarEstado($persona->id,$persona->estado));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/User/{id}', function ($request, $response, $args) {
    return $response->write(User::BorrarPersona($args['id']));
});
//***********************************USER********************************//

//***********************************LOCALES********************************//
$app->get('/Local', function ($request, $response, $args) {
    $datos=Local::TraerTodasLosLocal();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto_local=json_decode($datos[$i]->foto_local);
    }
    return $response->write(json_encode($datos));
});

$app->get('/Local/{objeto}', function ($request, $response, $args) {
    $id=json_decode($args['objeto']);
    $datos=Local::TraerUnLocal($id);
    $datos->foto_local=json_decode($datos->foto_local);
    return $response->write(json_encode($datos));
});

/* POST: Para crear recursos */
$app->post('/Local/{objeto}', function ($request, $response, $args) {
    
    $persona=json_decode($args['objeto']);
    $persona->foto_local=explode(';',$persona->foto_local);
    $arrayFoto = array();
    if(count($persona->foto_local) > 0){
        for ($i = 0; $i < count($persona->foto_local); $i++ ){
            $rutaVieja="fotos/".$persona->foto_local[$i];
            $rutaNueva=$persona->nombre_local. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= Url().$rutaNueva;
        } 
        $persona->foto_local=json_encode($arrayFoto); 
    }
    return $response->write(Local::InsertarLocal($persona)); 
});

// /* PUT: Para editar recursos */
$app->put('/Local/{objeto}', function ($request, $response, $args) {
    $persona=json_decode($args['objeto']);
    $persona->foto_local=explode(';',$persona->foto_local);
    $arrayFoto = array();
    if(count($persona->foto_local) > 0){
        for ($i = 0; $i < count($persona->foto_local); $i++ ){
            $rutaVieja="fotos/".$persona->foto_local[$i];
            $rutaNueva=$persona->nombre_local. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= Url().$rutaNueva;
        } 
        $persona->foto_local=json_encode($arrayFoto); 
    }
    return $response->write(Local::ModificarLocal($persona));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/Local/{id}', function ($request, $response, $args) {
    return $response->write(Local::BorrarLocal($args['id']));
});
//***********************************LOCALES********************************//

//***********************************PIZZAS********************************//
$app->get('/Pizza', function ($request, $response, $args) {
    $datos=Pizza::TraerTodasLasPizzas();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto_pizza=json_decode($datos[$i]->foto_pizza);
    }
    return $response->write(json_encode($datos));
});

$app->get('/Pizza/{objeto}', function ($request, $response, $args) {
    $id=json_decode($args['objeto']);
    $datos=Pizza::TraerUnaPizza($id);

    $datos->foto_pizza=json_decode($datos->foto_pizza);
    return $response->write(json_encode($datos));
});

/* POST: Para crear recursos */
$app->post('/Pizza/{objeto}', function ($request, $response, $args) {
    
    $persona=json_decode($args['objeto']);
    $persona->foto_pizza=explode(';',$persona->foto_pizza);
    $arrayFoto = array();
    if(count($persona->foto_pizza) > 0){
        for ($i = 0; $i < count($persona->foto_pizza); $i++ ){
            $rutaVieja="fotos/".$persona->foto_pizza[$i];
            $rutaNueva=$persona->descripcion_pizza. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= Url().$rutaNueva;
        } 
        $persona->foto_pizza=json_encode($arrayFoto); 
    }
    return $response->write(Pizza::InsertarPizza($persona)); 
});

// /* PUT: Para editar recursos */
$app->put('/Pizza/{objeto}', function ($request, $response, $args) {
    $persona=json_decode($args['objeto']);
    $persona->foto_pizza=explode(';',$persona->foto_pizza);
    $arrayFoto = array();
    if(count($persona->foto_pizza) > 0){
        for ($i = 0; $i < count($persona->foto_pizza); $i++ ){
            $rutaVieja="fotos/".$persona->foto_pizza[$i];
            $rutaNueva=$persona->descripcion_pizza. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= Url().$rutaNueva;
        } 
        $persona->foto_pizza=json_encode($arrayFoto); 
    }
    return $response->write(Pizza::ModificarPizza($persona));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/Pizza/{id}', function ($request, $response, $args) {
    return $response->write(Pizza::BorrarPizza($args['id']));
});
//***********************************PIZZAS********************************//

//***********************************PROMOCION********************************//
$app->get('/Promocion', function ($request, $response, $args) {
    return $response->write(json_encode(Promocion::TraerTodasLasPromociones()));
});

/* POST: Para crear recursos */
$app->post('/Promocion/{objeto}', function ($request, $response, $args) {
    return $response->write(Promocion::InsertarPromocion(json_decode($args['objeto']))); 
});

// /* DELETE: Para eliminar recursos */
$app->delete('/Promocion/{id}', function ($request, $response, $args) {
    return $response->write(Promocion::BorrarPromocion($args['id']));
});
//***********************************PROMOCION********************************//

//***********************************PEDIDO********************************//
$app->get('/Pedido', function ($request, $response, $args) {
    return $response->write(json_encode(Pedido::TraerTodasLosPedidos()));
});

/* POST: Para crear recursos */
$app->post('/Pedido/{objeto}', function ($request, $response, $args) {
    return $response->write(Pedido::InsertarPedido(json_decode($args['objeto']))); 
});

// /* PUT: Para editar recursos */
$app->put('/Pedido/{objeto}', function ($request, $response, $args) {
    return $response->write(Pedido::ModificarPedido(json_decode($args['objeto'])));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/Pedido/{id}', function ($request, $response, $args) {
    return $response->write(Pedido::BorrarPedido($args['id']));
});
//***********************************PEDIDO********************************//

/* Step 4: Run the Slim application*/
$app->run();
