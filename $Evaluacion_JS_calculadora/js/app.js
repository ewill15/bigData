var Calculadora = {
    init: function() {

    },
    reducirTecla: function() {},
    originalTecla: function() {},
    sumar: function(op1, op2) {
        resultado = op1 + op2;
        return resultado;
    },
    restar: function(op1, op2) {
        resultado = op1 - op2;
        return resultado;
    },
    multiplicar: function(op1, op2) {
        resultado = op1 * op2;
        return resultado;
    },
    dividir: function(op1, op2) {
        resultado = op1 / op2;
        return resultado;
    }
}


var op1 = 0;
var op2 = 0;
var operador = '';
var operadorAnterior = '';
var result = 0;
var temp = 0;
var flag = false; // para cargar el operador 2
//pantalla 
var pantalla = document.getElementById('display');
//boton de encendido
var btnON = document.querySelector('.teclado .tecla');
//boton cambio de signo
var btnSigno = document.querySelectorAll('.teclado .tecla')[1];

//botones numericas
var button0 = document.getElementsByClassName('col1')[0].childNodes[7];
var button1 = document.getElementsByClassName('col1')[0].childNodes[1];
var button2 = document.getElementsByClassName('col1')[0].childNodes[3];
var button3 = document.getElementsByClassName('col1')[0].childNodes[5];

var button4 = document.getElementsByClassName('teclado')[0].childNodes[17];
var button5 = document.getElementsByClassName('teclado')[0].childNodes[19];
var button6 = document.getElementsByClassName('teclado')[0].childNodes[21];
var button7 = document.getElementsByClassName('teclado')[0].childNodes[9];
var button8 = document.getElementsByClassName('teclado')[0].childNodes[11];
var button9 = document.getElementsByClassName('teclado')[0].childNodes[13];

//botones de operaciones
var btnSumar = document.getElementsByClassName('col2')[0].childNodes[1];
var btnRestar = document.getElementsByClassName('teclado')[0].childNodes[23];
var btnMultiplicar = document.getElementsByClassName('teclado')[0].childNodes[15];
var btnDividir = document.getElementsByClassName('teclado')[0].childNodes[7];

//boton  decimales
var btnDecimal = document.getElementsByClassName('col1')[0].childNodes[9];
//boton igual
var btnResultado = document.getElementsByClassName('col1')[0].childNodes[11];

function reiniciar() {
    //pantalla.innerHTML = '';
    op1 = 0;
    op2 = 0;
    operador = '';
    result = 0;
    pantalla.innerHTML = 0;
    flag = false;
}

function agregarMostrarNumero(numero) {
    if ((pantalla.innerHTML.indexOf('.') && pantalla.innerHTML.length < 9 && pantalla.innerHTML > 0) || (pantalla.innerHTML == '0.'))
        pantalla.innerHTML = pantalla.innerHTML + numero;
    else {
        if (pantalla.innerHTML == 0)
            pantalla.innerHTML = numero;
    }
}

function cambiarSigno() {
    var numero = pantalla.innerHTML;
    //if (numero > 0){
    numero = numero * -1;
    op2 = numero;
    //}
    pantalla.innerHTML = numero;
}

function nroDecimal() {
    var decimal = pantalla.innerHTML;
    if (decimal.indexOf(".") == -1) {
        pantalla.innerHTML = pantalla.innerHTML + '.';
    }
}

function mostrarResultado(numero) {
    pantalla.innerHTML = '';
    cantidad = contarDigitos(numero);
    if (!esEntero(numero)) {
        switch (cantidad) {
            case 2:
                pantalla.innerHTML = numero.toFixed(7);
                break;
            case 3:
                pantalla.innerHTML = numero.toFixed(6);
                break;
            case 4:
                pantalla.innerHTML = numero.toFixed(5);
                break;
            case 5:
                pantalla.innerHTML = numero.toFixed(4);
                break;
            case 6:
                pantalla.innerHTML = numero.toFixed(3);
                break;
            case 7:
                pantalla.innerHTML = numero.toFixed(2);
                break;
            case 8:
                pantalla.innerHTML = numero.toFixed(1);
                break;
            default:
                pantalla.innerHTML = numero.toFixed(8);
                break;

        }
    } else {
        if (cantidad < 9) {
            pantalla.innerHTML = numero;
        }
    }
}
//funciona
function esEntero(numero) {
    if (numero - Math.floor(numero) == 0) {
        //alert ("Es un numero entero");
        return true;
    } else {
        //alert ("Es un numero decimal");
        return false;
    }
}
//funciona   
contador = 0;
function contarDigitos(numero) {    
    if (esEntero(numero)) {
        if (numero < 0)
            numero *= -1
        while (numero > 0) {
            numero = parseInt(numero / 10);
            contarDigitos(numero);
            contador++;
        }
        
    } else {
    	//contar parte entera
    	contador = contarDigitos(parseInt(numero));
        //convertir numero a cadena
        strDecimal = (numero).toString();
        //agregar contador para el separador decimal si es positivo o negativo
        if (numero < 0)
            contador += 2
        else
            contador++

        strDecimal.substring(contador) //extraccion de parte decimal
        numero = Number(strDecimal) //conversion de cadena a numero de la parte decimal
        if (numero < 0)
            numero *= -1
        while (numero > 0) {
            numero = parseInt(numero / 10);
            contador++;
        }     
    }
    return contador;    
}
//funciona
function verificarOperacion(op1, op2, operacion) {
    if (op2 == 0 && flag == true) {
        flag = true;
    } else {
        /*console.log(op2 == 0 && flag == true)
        op2 = op2;*/
        op1 = realizarOperacion(operacion, op1, op2);
    }
    operador = operacion;
    return op1;
}
//funciona
function realizarOperacion(operador, op1, op2) {
    switch (operador) {
        case 'sumar':
            result = Calculadora.sumar(op1, op2);
            break;
        case 'restar':
            result = Calculadora.restar(op1, op2);
            break;
        case 'multiplicar':
            result = Calculadora.multiplicar(op1, op2);
            break;
        case 'dividir':
            result = Calculadora.dividir(op1, op2);
            break;
    }
    return result;
}
btnON.addEventListener('click', function() {

    reiniciar();
});
btnSigno.addEventListener('click', function() {
    cambiarSigno();
});
btnDecimal.addEventListener('click', function() {

    nroDecimal();
});

btnSumar.addEventListener("click", function() {
	if (flag)
    	op1=verificarOperacion(op1, op2, operadorAnterior);
	else{
			operador = 'sumar';
			op1=verificarOperacion(op1, op2, 'sumar');
		}
    flag = true;
    console.log('al presionar sumar flag=' + flag);
    pantalla.innerHTML = ' ';
    operadorAnterior = 'sumar';
});
btnRestar.addEventListener("click", function() {
    if (flag)
    	op1=verificarOperacion(op1, op2, operadorAnterior);
	else{
		operador = 'restar';
		op1=verificarOperacion(op1, op2, operador);
	}
    flag = true;
    pantalla.innerHTML = ' ';
    operadorAnterior = 'restar';
});
btnMultiplicar.addEventListener("click", function() {
    if (flag)
    	op1=verificarOperacion(op1, op2, operadorAnterior);
	else{
			operador = 'multiplicar';
			op1=verificarOperacion(op1, op2, 'multiplicar');
console.log('A: '+op1+' B: '+op2+'SIGNO: '+operador);
		}
    flag = true;
    pantalla.innerHTML = ' ';
    operadorAnterior = 'multiplicar';
});
btnDividir.addEventListener("click", function() {
    if (flag)
    	op1=verificarOperacion(op1, op2, operadorAnterior);
	else{
			operador = 'dividir';
			op1=verificarOperacion(op1, op2, 'dividir');
		}
    flag = true;
    pantalla.innerHTML = ' ';
    operadorAnterior = 'dividir';
});

btnResultado.addEventListener('click', function() {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //op2 = pantalla.innerHTML;    
    resultado = realizarOperacion(operador, parseFloat(op1), parseFloat(op2));
    console.log(operador + ' A: ' + op1 + ' == B:' + op2 + ' resultado ' + resultado);
    mostrarResultado(resultado);
    temp=op2
    op1=resultado
    op2=temp

});

button0.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (contarDigitos(pantalla.innerHTML.length) < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
});
button1.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (contarDigitos(pantalla.innerHTML.length) < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
});
button2.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 2 valor de op1=' + op1 + ' operador::'+operador);
});
button3.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 3 valor de op2=' + op2 + ' operador::'+operador);
});
button4.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 4 valor de A=' + op1 +' B='+op2 + ' operador::'+operador);
});
button5.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 5 valor de A=' + op1 +' B='+op2 + ' operador::'+operador);
});
button6.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 6 valor de A=' + op1 +' B='+op2 + ' operador::'+operador);
});
button7.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 7 valor de A=' + op1 +' B='+op2 + ' operador::'+operador);
});
button8.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 8 valor de A=' + op1 +' B='+op2 + ' operador::'+operador);
});
button9.addEventListener('click', function() {
    agregarMostrarNumero(this.alt);
    if (pantalla.innerHTML.length < 9) {
        if (flag) {
            op2 = parseFloat(pantalla.innerHTML);
        } else {
            op1 = parseFloat(pantalla.innerHTML);
        }
    }
    console.log('al presionar 9 valor de A=' + op1 +' B='+op2 + ' operador::'+operador);
});