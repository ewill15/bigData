var Biblioteca= {
    "Libro":[{
		"codigo":"0834RSO",
		"titulo":"Excepteur sint occaencat cupidatat",
		"editorial":"Programming Books",
		"fecha_publicacion":"18/02/1990",
		"edicion":"1era edicion",
		"estado":"disponible",
		"numero_paginas":180,
		"numero_copias":6,
		"autores":[{
			"nombre":"Eum lure",
			"fecha_nacimiento":"12/07/1967",
			"nacionalidad":"aleman"
			},{
			"nombre":"Autem vel",
			"fecha_nacimiento":"01/11/1952",
			"nacionalidad":"Irlandes"
			}]
		},
		{
		"codigo":"093E1D2",
		"titulo":"Ipsum quia dolor sit am",
		"editorial":"Programming Books",
		"fecha_publicacion":"10/10/1994",
		"edicion":"2da edicion",
		"estado":"disponible",
		"numero_paginas":240,
		"numero_copias":2,
		"autores":[{
			"nombre":"Finibus Bonorum",
			"fecha_nacimiento":"03/12/1940",
			"nacionalidad":"Ruso"
			},{
			"nombre":"Totam Rem Aperiam",
			"fecha_nacimiento":"11/08/1970",
			"nacionalidad":"Turco"
			}]
		},{
		"codigo":"087SRQ",
		"titulo":"Tablas de logaritmos",
		"editorial":"Gisbert y CIA S.A.",
		"fecha_publicacion":"15/01/1993",
		"edicion":"3da edicion",
		"estado":"disponible",
		"numero_paginas":201,
		"numero_copias":3,
		"autores":[{
			"nombre":"Eduardo W. Coppeti",
			"fecha_nacimiento":"03/12/1947",
			"nacionalidad":"Boliviano"
			},{
			"nombre":"Mario Coppeti",
			"fecha_nacimiento":"11/08/1978",
			"nacionalidad":"Boliviano"
			}]
		}]
}


var libro1 = Biblioteca.Libro[0];

var titulo_del_libro = libro1.titulo;
var codigo_del_libro = libro1.codigo;
var fecha_de_publicacion = libro1.fecha_publicacion;

alert ('El libro '+titulo_del_libro+' tiene el codigo '+codigo_del_libro+' y fue publicado el '+fecha_de_publicacion);