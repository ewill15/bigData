<?php
require('conector.php');
//crear conexion con la clase conector
$con = new conectorBD();
$response['conexion'] = $con->initConexion($con->database);
if ($response['conexion'] == 'OK') {
	if ($con->eliminarRegistro('eventos', 'id='.$_POST['id'])) {
		$response['msg'] = 'OK';
	}else{
		$response['msg'] = 'No se pudo eliminar el registro';
	}
}else{
	$response['msg'] = "ERROR al conectar la base de datos";
}
echo json_encode($response)
 ?>