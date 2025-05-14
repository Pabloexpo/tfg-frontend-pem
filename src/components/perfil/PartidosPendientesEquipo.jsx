import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'

const PartidosPendientesEquipo = ({ equipo }) => {
    const [partidosPendientes, setPartidosPendientes] = useState([])

    useEffect(() => {
        if (equipo) {
            fetch(`${API_URL}getReservasNoFinalizadasEquipo/${equipo}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Data recibida:', data.reservas)
                    setPartidosPendientes(data.reservas)
                    console.log('Data recibida:', partidosPendientes)
                })
                .catch(e => {
                    console.log('Error:', e.message)
                })
        }
    }, [equipo])
    function cancelaReserva(reserva_id) {
        fetch(`${API_URL}cancelaReserva/${reserva_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {                
                setPartidosPendientes((prevPartidos) =>
                    prevPartidos.filter((partido) => partido.reserva_id !== reserva_id)
                );
            })
            .catch(error => {
                console.error('Error al aceptar la petición de cese:', error)
            })
    }

    return (
        <>
            <h2 className='text-2xl font-bold py-4'>Partidos pendientes de realizar</h2>
            <div className="overflow-x-auto py-4">
                <table className='mx-auto'>
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">Pista</th>
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">Fecha</th>
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">Local</th>
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">Visitante</th>
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {partidosPendientes && partidosPendientes.length > 0 ? (
                            partidosPendientes.map((partido, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">{partido.pista_nombre}</td>
                                    <td className="py-2 px-4">{partido.reserva_fecha}</td>
                                    <td className="py-2 px-4">{partido.equipo1_nombre}</td>
                                    <td className="py-2 px-4">{partido.equipo2_nombre}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => cancelaReserva(partido.reserva_id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                            Cancelar reserva
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-2 px-4 text-center text-gray-500">
                                    No hay partidos pendientes
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default PartidosPendientesEquipo