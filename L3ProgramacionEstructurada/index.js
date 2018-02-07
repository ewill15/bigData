var IVA = 0.16
var Pedido = {
  cliente: "Federico Gutierrez",
  productos: ["Manzanas", "Refrescos", "Azucar", "Sal", "Lechugas frescas"],
  precios: [500, 4000, 2500, 2000, 5000],
  cantidad: [20, 10, 3, 3, 10]
}

var resultado = 0
var premio = ""
var valorTotal = 0

for(temp_precio in Pedido.precios){
	resultado += Pedido.precios[temp_precio]*Pedido.cantidad[temp_precio];
}

valorTotal = resultado - (resultado*IVA);

if (valorTotal > 100000){
	premio = "Tiene derecho a un premio";
}else{
	premio = "No tiene derecho a un premio";
}



var button = document.getElementById('calculo')
button.addEventListener('click', function(){

  alert("Señor(a) "+Pedido.cliente+", el valor total de su pedido es "+resultado+" y aplicando el iva el total es: "+valorTotal +" y debido al valor de tu compra: "+premio);
  

})
