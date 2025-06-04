import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'
import { toast } from 'react-toastify';
const ModalMensaje = ({ mensajeSeleccionado, cerrarModal, respuestaEnviada }) => {
    const [respuesta, setRespuesta] = useState('')
    //Elaboramos un modal para responder los mensajes que recibe el administrador
    function enviarRespuesta() {
        const cuerpo = {
            respuesta: respuesta,
        }
        fetch(`${API_URL}respondeMensaje/${mensajeSeleccionado.mensaje_id}`, {
            method: 'POST', 
            body: JSON.stringify(cuerpo),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta enviada:', data)
                cerrarModal()
                // Actualizar la lista de mensajes
                respuestaEnviada()
                toast.success('Respuesta enviada al contacto'); 
            })
            .catch(error => console.error('Error al enviar respuesta:', error))
    }
    return (
        // Modal para responder a los mensajes, lo fijamos en el centro de la pantalla 
        <div className="fixed inset-0 bg-footer bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                <h2 className="text-xl font-semibold mb-4">
                    Responder a {mensajeSeleccionado.nombre}
                </h2>
                <p className="mb-4 whitespace-pre-wrap">{mensajeSeleccionado.mensaje}</p>
                <textarea
                    placeholder="Escribe tu respuesta..."
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                    onChange={(e) => setRespuesta(e.target.value)}
                    value={respuesta}
                    rows={4}
                />
                <div className="flex justify-center">
                    <button
                        onClick={cerrarModal}
                        className="mr-3 py-2 px-4 rounded border border-gray-300 hover:bg-gray-100 transition duration-200"
                    >
                        Salir
                    </button>
                    <button
                        onClick={() => {enviarRespuesta()}}
                        className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalMensaje