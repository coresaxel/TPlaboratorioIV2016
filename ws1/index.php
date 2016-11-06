<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/User.php');
require 'vendor/autoload.php';
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);


/*  GET: Para consultar y leer recursos */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
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
    $Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/fotos/';
    
    $persona=json_decode($args['objeto']);
    $persona->foto_persona=explode(';',$persona->foto_persona);
    $arrayFoto = array();
    if(count($persona->foto_persona) > 0){
        for ($i = 0; $i < count($persona->foto_persona); $i++ ){
            $rutaVieja="fotos/".$persona->foto_persona[$i];
            $rutaNueva=$persona->dni_persona. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= $Url.$rutaNueva;
        } 
        $persona->foto_persona=json_encode($arrayFoto); 
    }
    return $response->write(User::InsertarPersona($persona)); 
});

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

// /* PUT: Para editar recursos */
$app->put('/User/{objeto}', function ($request, $response, $args) {
    $Url = 'http://localhost:8080/Laboratorio-IV-2016/TPlaboratorioIV2016/ws1/fotos/';
    $persona=json_decode($args['objeto']);
    $persona->foto_persona=explode(';',$persona->foto_persona);
    $arrayFoto = array();
    if(count($persona->foto_persona) > 0){
        for ($i = 0; $i < count($persona->foto_persona); $i++ ){
            $rutaVieja="fotos/".$persona->foto_persona[$i];
            $rutaNueva=$persona->id_usuario. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= $Url.$rutaNueva;
        } 
        $persona->foto_persona=json_encode($arrayFoto); 
    }
    return $response->write(User::ModificarPersona($persona));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/User/{id}', function ($request, $response, $args) {
    return $response->write(User::BorrarPersona($args['id']));
});
/* Step 4: Run the Slim application*/
$app->run();
