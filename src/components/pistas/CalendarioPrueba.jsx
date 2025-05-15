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
            setVistaActual(window.innerWidth < 640 ? 'dayGridMonth' : 'timeGridWeek')
        }
        window.addEventListener('resize', redimensionar)
        return () => window.removeEventListener('resize', redimensionar)
    }, [])

    useEffect(() => {
        console.log(pista)
        setLocalidad(pista.localidad)
        fetch(`${API_URL}reservasPista/${pista.pista_id}`)
            .then(res => res.json())
            .then(({ reservas }) => {
                setEventos(reservas.map(r => ({
                    title: '🔒',
                    start: r.reserva_fecha
                })))
            })
    }, [pista])

    const seleccionarFecha = info => {
        const fechaSeleccionada = new Date(info.dateStr).toISOString()
        const reservada = eventos.some(evento => {
            const diaEvento = new Date(evento.start).toISOString()
            return diaEvento === fechaSeleccionada
        })
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

        if (info.allDay) {
            setFecha({ fecha: null, hora: null, localidad: null })
            return
        }

        const d = info.date
        const fechaStr = d.toISOString().slice(0, 10)
        const hora = d.getHours() + ":00"

        setDia(fechaStr)
        setHora(hora)
        setLocalidad(pista.pista_localidad)

    }

    return (
        <div className="md:w-3/4 lg:w-1/2 w-full mx-auto">
            <div className="h-4/6 md:h-300px">
                <FullCalendar
                    plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                    initialView={vistaActual}
                    locale={esLocale}
                    height="490px"
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    buttonText={{
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día',
                        today: 'Hoy'
                    }}
                    slotMinTime="10:00:00"
                    slotDuration="02:00:00"
                    allDaySlot={false}
                    selectable={true}
                    events={eventos}
                    dateClick={seleccionarFecha}
                    selectOverlap={false}
                    eventDisplay="block"
                    eventClassNames={() => ['full-width-event']}
                />
            </div>

            {dia && hora ? (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    <h3 className="text-lg font-medium mb-2">
                        Clima para {dia} a las {hora}
                    </h3>
                    <div className='flex justify-around flex-col md:flex-row'>
                        <ClimaComponent fecha={dia} hora={hora} localidad={localidad} />
                        <ContrincanteComponent fecha={dia} hora={hora} pista={pista.pista_id} />
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