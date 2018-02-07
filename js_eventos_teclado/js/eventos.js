function mostrar_tecla(event){
	var tecla = event.which || event.keyCode;
	document.querySelector("#tarjeta_muestra_tecla #texto_tarjeta").innerHTML = "Presionaste la tecla: "+String.fromCharCode(tecla);
}

function cambiarTituloVerde(){
	document.querySelector("#tarjeta_cambia_color .card-image span").className = "card-title green";
}

function cambiarTituloNegro(){
	document.querySelector("#tarjeta_cambia_color .card-image span").className = "card-title black";
}

/**
KEY PRESS
document.onkeypress =  mostrar_tecla();
KEY DOWN
document.onkeydown = cambiarTituloVerde();
KEY UP
document.onkeyup = cambiarTituloNegro();
*/

function teclaTextBox(event){
	var tecla = event.which || event.keyCode;
	document.querySelector("#tarjeta_presiona_input_text .card-action a").innerHTML = "Presionaste: "+String.fromCharCode(tecla);
}