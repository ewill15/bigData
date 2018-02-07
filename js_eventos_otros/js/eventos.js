function cambiarRadioButtons(){
	var estadoRB = document.getElementById('activar_rb').checked;
	if (estadoRB){
		var estadp = "true";
        //desactivar radio buttons
		document.getElementById('animales').disabled=false;
		document.getElementById('postres').disabled=false;
		document.getElementById('musica').disabled=false;
	}else{
		document.getElementById('animales').disabled=true;
		document.getElementById('postres').disabled=true;
		document.getElementById('musica').disabled=true;
	}
}
function cargarPagina(){
	alert("Se ha cargado toda la pagina");
}

//document.getElementsByTagName('body')[0].onload = cargarPagina;

document.getElementById('activar_rb').onchange=cambiarRadioButtons;
/**
asociar evento
document.getElementById('activar_rb').onchange=cambiarRadioButtons;
document.getElementByTagName('body')[0].onload = cargarPagina;
*/

function eventoOnFocus(event){
	var seleccion = event.currentTarget.id;
	switch(seleccion){
		case "animales":
		document.getElementById('sel_animales').disabled=false;
		$(document).ready(function(){$('select').material_select()});
		break;
		case "postres":
		document.getElementById('sel_postres').disabled=false;
		$(document).ready(function(){$('select').material_select()});
		break;
		case "musica":
		document.getElementById('sel_musica').disabled=false;
		$(document).ready(function(){$('select').material_select()});
		break;
	}
}

function eventoOnBlur(event){
	var seleccion = event.currentTarget.id;
	switch(seleccion){
		case "animales":
		document.getElementById('sel_animales').disabled=true;
		$(document).ready(function(){$('select').material_select()});
		break;
		case "postres":
		document.getElementById('sel_postres').disabled=true;
		$(document).ready(function(){$('select').material_select()});
		break;
		case "musica":
		document.getElementById('sel_musica').disabled=true;
		$(document).ready(function(){$('select').material_select()});
		break;
	}
}

//asociar funciones a eventos
function asignarEventoRB(){
	document.getElementById('animales').onfocus=eventoOnFocus;
	document.getElementById('postres').onfocus=eventoOnFocus;
	document.getElementById('musica').onfocus=eventoOnFocus;

	document.getElementById('animales').onblur=eventoOnBlur;
	document.getElementById('postres').onblur=eventoOnBlur;
	document.getElementById('musica').onblur=eventoOnBlur;
}

asignarEventoRB();