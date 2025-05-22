import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import ClimaComponent from './ClimaComponent'
import ContrincanteComponent from './ContrincanteComponent'
import API_URL from '../functions/APIURL'

export default function CalendarioComponent({ pista }) {
    const [eventos, setEventos] = useState([])
    const [dia, setDia] = useState(null)
    const [hora, setHora] = useState(null)
    const [localidad, setLocalidad] = useState('')

    const [vistaActual, setVistaActual] = useState(
        window.innerWidth < 640 ? 'dayGridMonth' : 'timeGridWeek'
    )

    useEffect(() => {
        const redimensionar = () => {
            //Redimensionamos la vista dependiendo del tamaño de la pantalla
            setVistaActual(window.innerWidth < 640 ? 'dayGridMonth' : 'timeGridWeek')
        }
        // realizamos el evento para redimensionar el calendario
        window.addEventListener('resize', redimensionar)
    }, [])
    const cargarEventos = () => {
        fetch(`${API_URL}reservasPista/${pista.pista_id}`)
            .then(res => res.json())
            .then(({ reservas }) => {
                setEventos(reservas.map(r => ({
                    title: '🔒',
                    start: r.reserva_fecha
                })));
            });
    };

    useEffect(() => {
        setLocalidad(pista.localidad);
        // Cargamos el evento al cargar el componente
        cargarEventos();  
    }, [pista]);


    const seleccionarFecha = info => {
        // Obtenemos la vista actual desde FullCalendar
        const vistaCalendario = info.view.calendar;

        // Si estamos en vista mensual y hacemos clic, cambiamos a vista semanal
        if (vistaCalendario.view.type === 'dayGridMonth') {
            vistaCalendario.changeView('timeGridDay', info.dateStr);
            setVistaActual('timeGridDay');
            return;  // Salimos después de cambiar la vista
        }

        // Seleccionamos la fecha del calendario con el parametro info
        const fechaSeleccionada = new Date(info.dateStr).toISOString()
        // Verificamos si la fecha está ya reservada, puesto que la comparamos con la variable eventos (las fechas ya seleccionadas de la BBDD)
        const reservada = eventos.some(evento => {
            const diaEvento = new Date(evento.start).toISOString()
            return diaEvento === fechaSeleccionada
        })

        // Comprobamos si la fecha seleccionada es menor a la fecha actual
        const diaActual = new Date();
        const diaSeleccionado = new Date(info.dateStr);
        if (diaSeleccionado < diaActual) {
            alert('No puedes seleccionar una fecha pasada.')
            return
        }
        if (reservada) {
            alert('Esta fecha ya está reservada. Por favor, selecciona otra.')
            return
        }
        // si estamos en dia completo (formato mes) no podremos seleccionar nada 
        if (info.allDay) {
            setFecha({ fecha: null, hora: null, localidad: null })
            setVistaActual('timeGridWeek')
            return
        }

        // si no está reservada, seleccionamos la fecha y hora y se la pasamos por props al clima y contrincante para poder hacer fetch a la api de reservar pista
        const d = info.date
        const fechaStr = d.toISOString().slice(0, 10)
        const hora = d.getHours() + ":00"

        setDia(fechaStr)
        setHora(hora)
        setLocalidad(pista.pista_localidad)

    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="h-4/6 md:h-300px">
                <FullCalendar
                    plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                    initialView={vistaActual}
                    locale={esLocale}
                    height="auto"
                    contentHeight="auto"
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: window.innerWidth < 640 ? 'dayGridMonth' : 'dayGridMonth,timeGridWeek,timeGridDay' // Ocultamos los botones en móvil de semana y día para mejor experiencia visual
                    }}
                    buttonText={{
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día',
                        today: 'Hoy'
                    }}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false,
                        hour12: false
                    }}
                    slotMinTime="10:00:00"
                    slotMinHeight={100}
                    slotDuration="02:00:00"
                    allDaySlot={false}
                    selectable={true}
                    events={eventos}
                    dateClick={seleccionarFecha}
                    selectOverlap={false}
                    eventDisplay="block"
                    eventClassNames={() => ['full-width-event']}
                    dayHeaderFormat={{
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        omitCommas: true
                    }}

                />
            </div>

            {dia && hora ? (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    <h3 className="text-lg font-medium mb-2">
                        Clima para {dia} a las {hora}
                    </h3>
                    <div className='flex justify-around flex-col md:flex-row'>
                        <ClimaComponent fecha={dia} hora={hora} localidad={localidad} />
                        <ContrincanteComponent fecha={dia} hora={hora} pista={pista.pista_id} actualizarEventos={cargarEventos}/>
                    </div>
                </div>
            ) : (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    <h3 className="text-lg font-medium mb-2">
                        Debes elegir una hora para poder efectuar una reserva
                    </h3>
                </div>
            )}
        </div>
    )
}