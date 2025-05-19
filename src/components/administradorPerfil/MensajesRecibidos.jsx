import React, { useEffect, useState } from 'react'
import API_URL from '../functions/APIURL'
import ModalMensaje from './ModalMensaje'

const MensajesRecibidos = () => {
    const [mensajes, setMensajes] = useState([])
    const [modalAbierto, setModalAbierto] = useState(false)
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null)

    //extraemos el fetch del useEffect para actualizar el componente al mandar el mensaje
    const fetchMensajes = () => {
        fetch(`${API_URL}getMensajes`)
            .then(response => response.json())
            .then(data => setMensajes(data.mensajes))
            .catch(error => console.error('Error fetching mensajes:', error))
    }

    useEffect(() => {
        fetchMensajes()
    }, [])

    //funcion con la que abrimos el modal
    const abrirModal = (msj) => {
        setMensajeSeleccionado(msj)
        setModalAbierto(true)
    }
    // funcion para cerrar el modal
    const cerrarModal = () => {
        setModalAbierto(false)
        setMensajeSeleccionado(null)
    }
    // Elaboramos una funcion para actualizar el componente cuando enviemos una respuesta
    const respuestaEnviada = ()=>{
        cerrarModal()
        fetchMensajes()
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left text-gray-600">Nombre</th>
                        <th className="py-2 px-4 text-left text-gray-600">Email</th>
                        <th className="py-2 px-4 text-left text-gray-600">Mensaje</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {mensajes.map(mensaje => (
                        <tr key={mensaje.id} className="border-b border-gray-200">
                            <td className="py-2 px-4 whitespace-nowrap">{mensaje.nombre}</td>
                            <td className="py-2 px-4 whitespace-nowrap">{mensaje.email}</td>
                            <td className="py-2 px-4 whitespace-normal break-words line-clamp-3">{mensaje.mensaje}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => abrirModal(mensaje)}
                                    className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300"
                                >
                                    Responder
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {modalAbierto && mensajeSeleccionado && (
                <ModalMensaje
                    mensajeSeleccionado={mensajeSeleccionado}
                    cerrarModal={cerrarModal}
                    respuestaEnviada={respuestaEnviada}
                />
            )}
        </div>
    )
}
export default MensajesRecibidos
