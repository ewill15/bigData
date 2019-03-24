class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }
    //Redireccionar si no existe sesión iniciada
    sessionError() {
        alert('Usuario no ha iniciado sesión')
        window.location.href = 'http://localhost:3000/index.html'
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
            //Verificar que Usuario no ha iniciado sesion
            if (response == "logout") {
                //Mostrar resultado de la consulta
                this.sessionError()
            } else {
                //Ejecutar la función para renderizar los eventos en el calendario
                this.inicializarCalendario(response)
            }
        })
    }

    eliminarEvento(evento) {
        //id del evento
        let eventId = evento._id
        //enviar id del evento a eliminar
        $.post('/events/delete/' + eventId, { id: eventId }, (response) => {
            //Verificar que la respuesta no sea logout
            if (response == "logout") {
                //Llamar la funcion error de sesion
                this.sessionError()
            } else {
                //Eliminar evento del calendario y mostrar mensaje
                $('.calendario').fullCalendar('removeEvents', eventId);
                alert(response)
            }
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            /**
             * title => titulo del evento
             * start => fecha inicial
             * end   => fecha final
             * start _hour => hora de inicio
             * end_hour => hora fin
             */
            let
                start = $('#start_date').val(), 
                title = $('#titulo').val(), 
                end = '',
                start_hour = '',
                end_hour = '';
            //Verificar que el check Dia entero no esta activado
            if (!$('#allDay').is(':checked')) { 
                if ($('#start_hour').val() == "" || $('#end_hour').val() == "" || $('#end_date').val() == "") {
                    //mensaje  a mostrar para completar campos obligatorios
                    alert("Complete los campos obligatorios para el evento") 
                    return 
                }
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour //Convertir la información en formato GMZ
                end = end + 'T' + end_hour //Convertir la información en formato GMZ
            }
            let url = this.urlBase + "/new" //Guardar la información al controlador new en la variable url
            if (title != "" && start != "") { //Verificar que los campos title  y start no estén vacíos
                let ev = {
                    title: title,
                    start: start,
                    end: end
                }

                $.post(url, ev, (response) => {
                    if (response != "logout") {
                        /**
                         * _id => nuevo id al nuevo registro
                         * title => Titulo del evento
                         * start => fecha inicial
                         * end => fecha final
                         */
                        var newEvent = {
                            _id: response,
                            title: title, 
                            start: start,
                            end: end 
                        }
                        //agregar evento al calendario
                        $('.calendario').fullCalendar('renderEvent', newEvent)
                        //mensaje de accion exitosa
                        alert("Evento guardado.") 
                    }
                    else {
                        this.sessionError()
                    }
                })

            } else {
                alert("Complete los campos obligatorios para el evento") //Enviar alerta al usuario
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function () {
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            } else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        var d = new Date();
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(), //Mostrar el día actual como fecha predeterminada
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event, jsEvent) => {
                $('.delete').find('img').attr('src', "../img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event, jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                    this.eliminarEvento(event, jsEvent)
                }
                $('.delete').find('img').attr('src', "../img/trash.png");
            }
        })
    }

    actualizarEvento(evento) {
        //Verificar si el evento es de dia completo
        if (evento.end === null) { 
            //formato de fecha en YY-MM-DD solo fecha inicial
            var start = moment(evento.start).format('YYYY-MM-DD'), 
            //url del evento a modificar id, fecha de inicio, fecha final
                url = '/events/update/' + evento._id + '&' + start + '&' + start 
        } else {
            //si el evento no es dia completo
            // start y end enformato YYYY-MM-DD HH:mm:ss
            var start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'), 
                end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss');
            //url con los datos del evento a modificar  id, fecha de inicio, fecha final
            var url = '/events/update/' + evento._id + '&' + start + '&' + end ;
        }
        /**
         * id => identificador del evento
         * start => fecha inicial
         * end => fecha final
         */
        var data = { 
            id: evento._id, 
            start: start, 
            end: end 
        }
        /** enviar consulta por ajax */
        $.post(url, data, (response) => { 
            if (response == "logout") {
                this.sessionError() 
            } else {
                alert(response)
            }
        })
    }

    cerrarSesion() {
        /**
         * url pagina a consultar
         * data datos a enviar
         */
        var url = "/usuarios/logout", 
            data = ""; 
        $.post(url, data, (response) => {
            if (response == "logout") {
                window.location.href = "http://localhost:3000/index.html"
            } else {
                alert("Error inesperado al cerrar sesion") 
            }
        })
    }
}

const Manager = new EventManager()
//Cerrar sesion
$('.logout-container').on('click', function () {
    Manager.cerrarSesion()
})