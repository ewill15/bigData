<?php 
	require('./conector.php');
$con = new ConectorBD();
if(  $con->initConexion($con->database) == 1049){ 
  //Verificar si la base de datos no fue creada en el servidor
  $conexion['msg'] = "Creando base de datos ".$con->database;
  $database = $con->newDatabase(); 
    if ($database != "OK"){ 
      $conexion['msg'] = "<h5>Error de privilegios</h5></br>El usuario <b>'$con->user'</b> no existe o no posee los permisos requeridos para crear la base de datos";
      $conexion['msg'] .= "Para crear automaticamente la base de datos, ingrese los parametros de usuario, contrasena en <b>server/conector.php</b>. ";
      $conexion['msg'] .= " O puede crearla manualmente desde phpmyadmin.";
    }else{
        $conexion['database'] = "OK"; //Estado OK
        $conexion['msg'] = "Base de datos creada exitosamente"; 
    }
  }else{
    //Si la base de datos ya existe
    $conexion['database'] = "OK";
    $conexion['msg'] = "Base de datos <b>".$con->database."</b> encontrada";
}
 echo json_encode($conexion);
?>