import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'
import { toast } from 'react-toastify';
const PartidosPendientesEquipo = ({ equipo }) => {
    const [partidosPendientes, setPartidosPendientes] = useState([])
    const [modalAbierto, setModalAbierto] = useState(false)
    const [partido, setPartido] = useState({})

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
                setModalAbierto(false) //Cerramos el modal al eliminar la reserva
                toast.success('Reserva cancelada correctamente')
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
                                            onClick={() => {
                                              setModalAbierto(true)  
                                              setPartido(partido.reserva_id) // Guardamos el partido para usarlo en la confirmación
                                            } }
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
            {modalAbierto && (
                <div className="fixed inset-0 bg-footer bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">
                            ¿Estás seguro de que quieres eliminar la reserva?
                        </h2>
                        <p className="mb-4 whitespace-pre-wrap">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center">
                            {/* Realizamos la confirmación de eliminación de usuario con este botón, que activará la función que elimina al usuario */}
                            <button
                                onClick={() => cancelaReserva(partido)}
                                className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300">
                                Eliminar
                            </button>
                            <button
                                onClick={() => { setModalAbierto(false) }}
                                className="ml-3 py-2 px-4 rounded border border-gray-300 hover:bg-gray-100 transition duration-200">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PartidosPendientesEquipo