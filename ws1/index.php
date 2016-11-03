<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/Personas.php');
require 'vendor/autoload.php';
require_once('jwt/php/Autenticar.php');
$app = new Slim\App();


/*  GET: Para consultar y leer recursos */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/Login/{objeto}', function ($request, $response, $args) {
    $usuario=json_decode($args['objeto']);
    return $response->write(Autenticador::Login($usuario));
});

$app->get('/personas[/]', function ($request, $response, $args) {
    $datos=Persona::TraerTodasLasPersonas();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});

/* POST: Para crear recursos */
$app->post('/personas/{objeto}', function ($request, $response, $args) {
    $Url = 'http://localhost:8080/Laboratorio-IV-2016/Clase.09/Clase.07/ws1/fotos/';
    
    $persona=json_decode($args['objeto']);
    $persona->foto=explode(';',$persona->foto);
    $arrayFoto = array();
    if(count($persona->foto) > 0){
        for ($i = 0; $i < count($persona->foto); $i++ ){
            $rutaVieja="fotos/".$persona->foto[$i];
            $rutaNueva=$persona->dni. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= $Url.$rutaNueva;
        } 
        $persona->foto=json_encode($arrayFoto); 
    }
    return $response->write(Persona::InsertarPersona($persona)); 
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
$app->put('/personas/{objeto}', function ($request, $response, $args) {
    $Url = 'http://localhost:8080/Laboratorio-IV-2016/Clase.09/Clase.07/ws1/fotos/';
   $persona=json_decode($args['objeto']);
    $persona->foto=explode(';',$persona->foto);
    $arrayFoto = array();
    if(count($persona->foto) > 0){
        for ($i = 0; $i < count($persona->foto); $i++ ){
            $rutaVieja="fotos/".$persona->foto[$i];
            $rutaNueva=$persona->dni. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]= $Url.$rutaNueva;
        } 
        $persona->foto=json_encode($arrayFoto); 
    }
    return $response->write(Persona::ModificarPersona($persona));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/personas/{id}', function ($request, $response, $args) {
    return $response->write(Persona::BorrarPersona($args['id']));
});
/* Step 4: Run the Slim application*/
$app->run();
