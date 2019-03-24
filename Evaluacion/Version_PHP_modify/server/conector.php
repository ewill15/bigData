<?php 
	session_start();
	/**
	 * host  nombre de servidor
	 * user nombre de usuario de la base de datos
	 * password contraseña de acceso
	 * database nombre de la base de datos
	 */
	class conectorBD{
		private $host = 'localhost';
		private $user = 'agenda';
		private $password = 'agenda123';
		public $database = 'agenda_php_db';

		public $conexion;

	function verifyConexion(){
       //creart conexion 
	    $init = @$this->conexion = new mysqli($this->host, $this->user, $this->password);

	    if( ! $this->conexion ){
	      $conexion['msg'] = "<h3>Error al conectarse a la base de datos.</h3>";
			}
			//Verificar si existe un error
	    if( $this->conexion->connect_errno != '0' ){ 
	      $response =  "<h5>Error al conectarse a la base de datos.</h5> "; 
//Verificar que el error sea por resolución de nombre de servidor
	      if ($this->conexion->connect_errno == "2002" ){ 
	        $response.="<p><h5>Error de conexión</h5> Verifique del servidor en la carpeta server del proyecto</p>";
	      }
//Verificar que el error sea por error de usuario y/o contraseña
	      if ($this->conexion->connect_errno == "1045" ){ 
	        $response.="<h5>Error de conexión</h5><p>Verifique el usuario y contraseña son correctos</p>";
	      }
//Verificar que el error sea por error de usuario y/o contraseña
	      if ($this->conexion->connect_errno == "1044" ){  
	        $response.="<h5>Error de conexión</h5><p>Verifique el usuario y contraseña son correctos</p>";
	      }

	      $conexion['phpmyadmin'] = "Error"; //Guardar el estado durante la conexión
	      $conexion['msg'] = $response; //Guardar la descripcion del error 
	    }else{

	      /*Si los parametros de conexion son correctos continuar*/
	      $conexion['phpmyadmin'] =  "OK"; //Guardar el estado 
	      $conexion['msg'] =  "<p>Conexion establecida con phpMyadmin</p>"; //Guardar la descripcion del mensaje
			}
			//Devolver respuesta
	   		 echo json_encode($conexion); 
	  }
/** iniciar conexion a base de datos */
	  function initConexion($nombre_db){
	  	$this->conexion = new mysqli($this->host, $this->user, $this->password, $nombre_db);
	  	if ($this->conexion->connect_error) {
	  		return $this->conexión->connect_errno;
	  	}else{
	  		return "OK";
	  	}
	  }
/** retornar sesion de usuario */
	  function userSession(){
	  	if (isset($_SESSION['email'])) {
	  		$response['msg'] = $_SESSION['email'];
	  	}else{
	  		$response['msg'] = '';
	  	}
	  	return json_encode($response);
	  }
/** verificar usuario */
	  function verifyUsers(){
	  	$sql = 'SELECT COUNT(email) FROM usuarios';
	  	$totalUsers = $this->ejecutarQuery($sql);
	  	while ($row = $totalUsers->fetch_assoc()) {

	  		return $row['COUNT(email)'];
	  	}
	  }
/** obtener conexion */
	  function getConexion(){
	  	return $this->conexion;
		}
		/** ejecutar consulta */
	  function ejecutarquery($query){
	  	return $this->conexion->query($query);
		}
		
	  function crearTabla($nombre_tbl, $campos){
	  	$this->conexion = new mysqli($this->host,$this->user,$this->password,$this->database);
	  	if($this->conexion->connect_errno){
	  		return $this->conexion->connect_errno;
	  	}else{
	  		//Construcción del script
	      $sql = 'CREATE TABLE IF NOT EXISTS '.$nombre_tbl.' (';
	      $length_array = count($campos);
	      $i = 1;
	      foreach ($campos as $key => $value) {
	        $sql .= $key.' '.$value;
	        if ($i!= $length_array) {
	          $sql .= ', ';
	        }else {
	          $sql .= ');';
	        }
	        $i++;
	      }
	      
	      $query =  $this->ejecutarQuery($sql);
/** devolver estado */
	      if($query == 1)
	      {
	        return "OK"; 
	      }
	      else{
	        return "Error";
	  	  }
	    }
		}
		/** cerrar conexion de base de datos */
	  function cerrarConexion(){
	  	$this->conexion->close();
		}
		/** crear base de datos */
	  function crearDB(){
	  	$this->conexion =new mysqli($this->host,$this->user,$this->password);
	  	$query = $this->conexion->query('CREATE DATABASE IF NOT EXISTS '.$this->database);
	  	if ($query == 1) {
	  		return "OK";
	  	}else {
	  		return "Error";
	  	}
		}
		/** crear nueva restrincion a una tabla */
	  function nuevaRestriccion($tabla, $restriccion){ 
	    $sql = 'ALTER TABLE '.$tabla.' '.$restriccion;
	    return $this->ejecutarQuery($sql);
	 }
	 /** agregar una relacion entre tablas */
	  function nuevaRelacion($from_tbl, $to_tbl, $fk_foreign_key_name, $from_field, $to_field){
    	$sql = 'ALTER TABLE '.$from_tbl.' ADD CONSTRAINT '.$fk_foreign_key_name.' FOREIGN KEY ('.$from_field.') REFERENCES '.$to_tbl.'('.$to_field.');';
    	return $this->ejecutarQuery($sql);
		}
		/** insertar datos a una tabla */
    function insertData($tabla, $data){
    $sql = 'INSERT INTO '.$tabla.' (';
    $i = 1;
    foreach ($data as $key => $value) {
      $sql .= $key;
      if ($i<count($data)) {
        $sql .= ', ';
      }else $sql .= ')';
      $i++;
    }
    $sql .= ' VALUES (';
    $i = 1;
    foreach ($data as $key => $value) {
      $sql .= $value;
      if ($i<count($data)) {
        $sql .= ', ';
      }else $sql .= ');';
      $i++;
		}
		
    return $this->ejecutarQuery($sql);
  }

  //Función para actualizar registro en la base de datos
  function actualizarRegistro($tabla, $data, $condicion){
    $sql = 'UPDATE '.$tabla.' SET ';
    $i=1;
    foreach ($data as $key => $value) {
      $sql .= $key.'='.$value;
      if ($i<sizeof($data)) {
        $sql .= ', ';
      }else $sql .= ' WHERE '.$condicion.';';
      $i++;
		}
		#echo $sql;
    return $this->ejecutarQuery($sql);
  }

  //Función para eliminar registro en base de datos
  function eliminarRegistro($tabla, $condicion){
    $sql = "DELETE FROM ".$tabla." WHERE ".$condicion.";";
    return $this->ejecutarQuery($sql);
  }

  //Función para consultar información en base de datos
  function consultar($tablas, $campos, $condicion = ""){
    $sql = "SELECT ";
    $result = array_keys($campos);
    $ultima_key = end($result);
    foreach ($campos as $key => $value) {
      $sql .= $value;
      if ($key!=$ultima_key) {
        $sql.=", ";
      }else $sql .=" FROM ";
    }

    $result = array_keys($tablas);
    $ultima_key = end($result);
    foreach ($tablas as $key => $value) {
      $sql .= $value;
      if ($key!=$ultima_key) {
        $sql.=", ";
      }else $sql .= " ";
    }

    if ($condicion == "") {
      $sql .= ";";
    }else {
      $sql .= $condicion.";";
    }
    return $this->ejecutarQuery($sql);
  }
 

}

class Usuarios 
{
  public $nombreTabla = 'usuarios'; //Definir nombre de la tabla
  /*Matriz con las columnas que componen la tabla usuarios*/
  public $data = ['email' => 'varchar(50) NOT NULL PRIMARY KEY',
  'nombre' => 'varchar(50) NOT NULL',
  'password' => 'varchar(255) NOT NULL',
  'fecha_nacimiento' => 'date NOT NULL'];

}

class Eventos
{
  public $nombreTabla = 'eventos'; //Definir nombre de la tabla
  /*Matriz con las columnas que componen la tabla eventos*/
  public $data = ['id' => 'INT NOT NULL PRIMARY KEY AUTO_INCREMENT',
  'titulo'=> 'VARCHAR(50) NOT NULL',
  'fecha_inicio'=> 'date NOT NULL',
  'hora_inicio' => 'varchar(20)',
  'fecha_fin'=> 'varchar(20)',
  'hora_fin'=> 'varchar(20)',
  'allday'=> 'tinyint(1) NOT NULL',
  'fk_usuarios'=>'varchar(50) NOT NULL'];
}

 ?>