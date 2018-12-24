var calculadora = {
	
	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,
	
	init: (function(){
		this.eventosBotones(".tecla");
		this.eventosaFuncion();
	}),
	
	//Eventos de formato de botones	
	eventosBotones: function(selector){
		var btn = document.querySelectorAll(selector);
		for (var i = 0; i<btn.length;i++) {
			btn[i].onmouseover = this.eventoDisminuirBoton;
			btn[i].onmouseleave = this.eventoNormalBoton;
		};
	},
//asignar evento para disminuir tamano de boton
	eventoDisminuirBoton: function(event){
		calculadora.disminuirBoton(event.target);
	},
//asignar evento para boton  de tamano normal
	eventoNormalBoton: function(event){
		calculadora.aumentaBoton(event.target);
	},
	
	//Formato de botones 	
	disminuirBoton: function(elemento){
		var btn = elemento.id;
		if (btn == "1" || btn == "2" || btn == "3" || btn == "0" || btn == "igual" || btn == "punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(btn == "mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	aumentaBoton: function(elemento){
		var btn = elemento.id;
		if (btn == "1" || btn == "2" || btn == "3" || btn == "0" || btn == "igual" || btn == "punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(btn == "mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
	
	borrarPantalla: function(){ 
	    this.valorPantalla = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.actualizarPantalla();
	},
	
	cambiarSigno: function(){
		if (this.valorPantalla != "0") {
			var aux;
			if (this.valorPantalla.charAt(0) == "-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.actualizarPantalla();
		}
	},
	
	ingresarDecimal: function(){
		if (this.valorPantalla.indexOf(".") == -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.actualizarPantalla();
		}
	},
	
	ingresarNumero: function(valor){
		if (this.valorPantalla.length < 8) {
		
			if (this.valorPantalla == "0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.actualizarPantalla();
		}
	},
	
	ingresarOperacion: function(oper){
		this.primerValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.actualizarPantalla();
	},
	
	verResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		this.primerValor = this.resultado;
		this.valorPantalla = "";
	
		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.auxTeclaIgual = true;		
		this.actualizarPantalla();
	
	},
	
	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;
		}
	},
	
	actualizarPantalla: function(){
		this.pantalla.innerHTML = this.valorPantalla;
	},

	eventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresarDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresarOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresarOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresarOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresarOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresarOperacion("+");});
	}
	
};

calculadora.init();