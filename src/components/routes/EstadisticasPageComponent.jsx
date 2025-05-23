import React, { useState, useEffect } from 'react'
import ClasificacionGeneralComponent from '../Estadisticas/ClasificacionGeneralComponent.jsx'
import HistoricoEquipo from '../Estadisticas/HistoricoEquipo.jsx'
import PistasUtilizadasEquipo from '../Estadisticas/PistasUtilizadasEquipo.jsx'
import API_URL from '../functions/APIURL.jsx'
import PartidosDisputadosEquipo from '../perfil/PartidosDisputadosEquipo.jsx'
import GlobalesEquipo from '../Estadisticas/GlobalesEquipo.jsx'
import IntegrantesEquipo from '../perfil/IntegrantesEquipo.jsx'
import CantidadPartidosEquipo from '../Estadisticas/CantidadPartidosEquipo.jsx'


const EstadisticasPageComponent = () => {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(sessionStorage.getItem('equipoIdSeleccionado') || '')
    
    const actualizarEquipoSeleccionado = () => {
        setEquipoSeleccionado(sessionStorage.getItem('equipoIdSeleccionado') || '')
    }
    useEffect(() => {
        const cambiosSessionStorage = () => {
            actualizarEquipoSeleccionado()
        }
        // Escuchar cambios en sessionStorage desde otras pestañas
        window.addEventListener('storage', cambiosSessionStorage)
    }, [])

    return (
        <main className="max-w-[1200px] flex flex-col min-h-100 h-auto m-auto">
            <h1 className='text-3xl font-bold text-center py-4'>Estadísticas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {/* Columna izquierda: Clasificación */}
                <section className='bg-white rounded-lg shadow-md p-4 '>
                    <h3 className="text-xl font-semibold mb-2">Clasificación general de los equipos</h3>
                    <ClasificacionGeneralComponent actualizarEquipoSeleccionado={actualizarEquipoSeleccionado} />
                </section>

                {/* Columna derecha: Histórico y Pistas */}
                {equipoSeleccionado !== '' && (
                    <section className='bg-white rounded-lg shadow-md p-4 gap-4'>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Estadísticas personalizadas de {sessionStorage.getItem('equipoNombreSeleccionado')}
                            </h3>
                            <HistoricoEquipo equipo={equipoSeleccionado} />
                        </div>
                        <div>
                            <PistasUtilizadasEquipo equipo={equipoSeleccionado} />
                        </div>
                    </section>
                )}
                {!equipoSeleccionado && (
                    <section className='bg-white rounded-lg shadow-md p-4 h-fit'>
                        <h3 className="text-xl font-semibold mb-2">Selecciona un equipo para ver estadísticas personalizadas</h3>
                    </section>
                )}
            </div>
            {equipoSeleccionado && (
                <>
                    <section className='bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 md:w-fit w-5/6 m-auto items-center'>
                        <article className="flex-1">
                            <IntegrantesEquipo equipo={equipoSeleccionado} />
                        </article>
                        <article className="flex-1">
                            <CantidadPartidosEquipo equipo={equipoSeleccionado} />
                        </article>
                    </section>
                    <section>
                        <PartidosDisputadosEquipo equipo={equipoSeleccionado} />
                    </section>
                </>
            )}
        </main>
    )
}

export default EstadisticasPageComponent