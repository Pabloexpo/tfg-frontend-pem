import React, { use } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import API_URL from '../functions/APIURL'

const MensajesRecibidos = () => {
    // Este componente se encargará de mostrar los mensajes recibidos por el administrador
    const [mensajes, setMensajes] = React.useState([]);
    useEffect(() => {
        fetch(`${API_URL}getMensajes`)
            .then(response => response.json())
            .then(data => {
                setMensajes(data.mensajes)
                console.log(data.mensajes)
            })
            .catch(error => console.error('Error fetching mensajes:', error));
    }, [])
    return (
        <div className="overflow-x-auto md:overflow-x-visible">
            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                <tr className="bg-gray-100">
                    <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">
                        Nombre
                    </th>
                    <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">
                        Email
                    </th>
                    <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600 md:whitespace-normal md:break-words">
                        Mensaje
                    </th>
                </tr>
                {mensajes.map((mensaje) => (
                    <tr key={mensaje.id} className="border-b border-gray-200">
                        <td className="whitespace-nowrap py-2 px-4">
                            {mensaje.nombre}
                        </td>
                        <td className="whitespace-nowrap py-2 px-4">
                            {mensaje.email}
                        </td>
                        <td className="whitespace-nowrap md:whitespace-normal md:break-words py-2 px-4">
                            {mensaje.mensaje}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
export default MensajesRecibidos