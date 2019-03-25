<?php
  	require('./conector.php');
$con = new ConectorBD();
/*Conectarse a la base de datos agenda_php_db*/
$response['conexion'] = $con->initConexion($con->database);
if($response['conexion'] == 'OK'){
    /*Generar un arreglo con los datos a enviar*/
    $data['titulo'] = '"'.$_POST['titulo'].'"';
    $data['fecha_inicio'] = '"'.$_POST['start_date'].'"';
    $data['hora_inicio'] = '"'.$_POST['start_hour'].':00"';
    $data['fecha_fin'] = '"'.$_POST['end_date'].'"';
    $data['hora_fin'] = '"'.$_POST['end_hour'].':00"'; 
    $data['allday'] = $_POST['allDay'];
    $data['fk_usuarios'] = '"'.$_SESSION['email'].'"';

    /*Insertar los datos en la tabla eventos*/
    if($con->insertData('eventos', $data)){ 
        //obtener el id del evento registrado
        $resultado = $con->consultar(['eventos'],['MAX(id)']); 
        while($fila = $resultado->fetch_assoc()){
            //Enviar ultimo Id guardado como parámetro para el calendario
          $response['id']=$fila['MAX(id)']; 
        }
        $response['msg'] = 'OK';
    }else{
        $response['msg'] = "Ha ocurrido un error al guardar el evento";
    }
}else{
    $response['msg'] = "Error en la comunicacion con la base de datos";
}
/*devolver la respuesta en formato json*/
echo json_encode($response);
?>