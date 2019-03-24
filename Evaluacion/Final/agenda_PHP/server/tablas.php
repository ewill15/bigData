<?php
require('conector.php'); 
$con = new ConectorBD(); //instancia de conexion
$usuarios = new Usuarios(); //Instancia usuario
$eventos = new Eventos(); //Instancia eventos
//Inicializar variabLes
$response['detalle'] = "Lista de errores:</br><ol>";
$resonse['usuarios'] = "";
$response['eventos']='';

//Crear Tabla usuarios con la información del objeto Eventos
$result = $con->crearTabla($usuarios->nombreTabla, $usuarios->data); 
if( $result == "OK"){ //Si el resultado es OK todas las respuestas son OK
  $response['msg'] = "OK";
  $response['detalle'] = "OK";
  $response['usuarios'] = "OK";
}else{ //Si no, agregar error
  $response['detalle'] .= "<li>Error al crear la tabla usuarios.</li>";
}

//Crear Tabla eventos con la información del objeto Eventos
$result = $con->crearTabla($eventos->nombreTabla, $eventos->data);
if( $result == "OK"){ 
  //Si el resultado es correcto
  $response['msg'] = "OK";
  $response['detalle'] = "OK";
  $response['usuarios'] = "OK";
}else{ //En caso de ocurrir algun error devolver mensaje de detalle
  $response['detalle'] .= "<li>Error al crear la tabla eventos.</li>";
}
//Si las tablas evento y usuarios se encuentran en la base de datos
if($response['eventos'] =='OK' AND $response['usuarios'] == 'OK' ){ 
  //Crear un Índice (index) en la columna fk_usuarios de la tabla eventos
  $result =  $con->nuevaRestriccion($eventos->nombreTabla, 'ADD KEY fk_usuarios (fk_usuarios)');
  if( $result == "OK"){
    $response['Index'] = 'OK';
    $response['detalle'] = 'OK';
  }
  //Crear una relación entre las tablas eventos y usuarios asignando a la tabla eventos el valor email a través de una clave foránea
  $result =  $con->nuevaRelacion($eventos->nombreTabla, $usuarios->nombreTabla, 'fk_usuarioemail_evento', 'fk_usuarios', 'email'); //nombre de la tabla origen, nomvre tabla destino, nombre de la clave foranea, nombre de la columna origen, nombre de columna destino
  if( $result == "OK"){
    $response['Clave Foránea'] = 'OK';
    $response['detalle'] = 'OK';
  }
}else{
  $response['detalle'] .='</ol> </br>Verifique que los datos del usuario y contraseña de la base de datos';
  $response['msg'] = $response['detalle'];
}

echo json_encode($response); //Devolver resultado
?>