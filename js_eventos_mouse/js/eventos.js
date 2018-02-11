//disminucion de tamano de imagen
function cambioFotoAstronauta() {
    document.getElementById("astronauta").style = "width:50%";
}

//efecto de desenfoque
function cambioFotoExtraterrestre() {
    document.getElementById('extraterrestre').style = "-webkit-filter:blur(5px);filter:blur(5px);";
}

//efecto hue-rotate
function cambioFotoPlanetas() {
    document.getElementById('planetas').style = "filter:hue-rotate(90deg);-webkit-filter:hue-rotate(90deg);";
}

//efecto sepia
function cambioFotoNave() {
    document.getElementById('nave_espacial').style = "filter:sepia(100%);-webkit-filter:sepia(100%);";
}

/*asociacion de eventos de mouse */

document.getElementById('astronauta').onclick = cambioFotoAstronauta;
document.getElementById('extraterrestre').ondblclick = cambioFotoExtraterrestre;
document.getElementById('planetas').onmouseover = cambioFotoPlanetas;
document.getElementById('nave_espacial').onmouseout = cambioFotoNave;
