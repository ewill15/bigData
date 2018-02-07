//almacenar datos
var datos = {...}
localStorage.setItem('NombreItem',JSON.stringify(datos))
sessionStorage.setItem('NombreItem',JSON.stringify(datos))
localStorage.NombreItem = JSON.stringify(datos)
sessionStorage.NombreItem = JSON.stringify(datos)

//Obtener datos
var datos = JSON.parse(sessionStorage.getItem('NombreItem'))
var datos = JSON.parse(localStorage.getItem('NombreItem'))
//o tambien
var datos = JSON.parse(sessionStorage.NombreItem)
var datos = JSON.parse(localStorage.NombreItem)

//borrar datos
localStorage.removeItem('NombreItem')
sessionStorage.removeItem('NombreItem')
//borrar con la palabra delete
delete localStorage.NombreItem
delete sessionStorage.NombreItem