<?php
	  /*requerir el archivo conector.php*/
require('./conector.php');

$con = new ConectorBD();

$response['msg'] = $con->initConexion($con->database);

if ($response['msg']=='OK') {
  $resultado = $con->consultar(['eventos'],['*'], "WHERE fk_usuarios ='".$_SESSION['email']."'",'');

  $i = 0;

  while($fila = $resultado->fetch_assoc()){
    $response['eventos'][$i]['id'] = $fila['id'];
    $response['eventos'][$i]['title'] = $fila['titulo'];
    //verificacion si el evento es full day
    if ($fila['allday'] == 0){ 
      $allDay = false;
      $response['eventos'][$i]['start'] = $fila['fecha_inicio'].'T'.$fila['hora_inicio'];

      $response['eventos'][$i]['end'] = $fila['fecha_fin'].'T'.$fila['hora_fin'];
    }else{
      /*Si no es full day, no agregar la hora en el parametro start*/ 
      $allDay= true;     
      $response['eventos'][$i]['start'] = $fila['fecha_inicio'];
      $response['eventos'][$i]['end'] = "";
    }
    $response['eventos'][$i]['allDay'] = $allDay;
    $i++;
  }
 $response['getData'] = "OK";
}
echo json_encode($response);
 ?>