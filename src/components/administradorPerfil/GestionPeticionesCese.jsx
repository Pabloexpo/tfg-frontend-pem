import React, { useEffect, use } from 'react'
import API_URL from '../functions/APIURL'
import { toast } from 'react-toastify';
const GestionPeticionesCese = () => {
    //Recogemos las peticiones de cese de la base de datos y las mostramos en una tabla
    //Cada fila de la tabla tendrá un botón para aceptar o rechazar la petición
    //Cuando se acepte o rechace la petición, se eliminará de la base de datos y se actualizará la tabla
    const [peticionesCese, setPeticionesCese] = React.useState([])
    useEffect(() => {
        fetch(`${API_URL}getPeticiones`)
            .then(response => response.json())
            .then(data => {
                setPeticionesCese(data.peticiones)
                console.log(data.peticiones)
            })
            .catch(error => {
                console.error('Error fetching peticiones de cese:', error)
            })
    }, [])
    //Hacemos la funcion para aceptar la peticion de cese
    function aceptaPeticion(id, peticion_id) {
        fetch(`${API_URL}aceptaPeticion/${id}/${peticion_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar la lista de peticiones de cese después de aceptar una
                // Filtramos con peticion_id correctamente
                setPeticionesCese((prevPeticiones) =>
                    //Es decir, filtramos por las peticiones que haya EXCEPTUANDO la que hemos aceptado
                    prevPeticiones.filter((peticion) => peticion.peticion_id !== peticion_id)
                );
                toast.success('Has aceptado la petición de cese')
            })
            .catch(error => {
                console.error('Error al aceptar la petición de cese:', error)
            })
    }
    function rechazaPeticion(peticion_id) {
        fetch(`${API_URL}rechazaPeticion/${peticion_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar la lista de peticiones de cese después de rechazar una
                setPeticionesCese((prevPeticiones) =>
                    prevPeticiones.filter((peticion) => peticion.peticion_id !== peticion_id)
                );
                toast.success('Has rechazado la petición de cese')
            })
            .catch(error => {
                console.error('Error al rechazar la petición de cese:', error)
            })
    }

    return (
        <div className="p-4">
            {/* Contenedor con scroll horizontal en pantallas pequeñas */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">Equipo</th>
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600">Motivo</th>
                            <th className="whitespace-nowrap py-2 px-4 text-left text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {peticionesCese.map((peticion) => (
                            <tr key={peticion.id} className="border-b border-gray-200">
                                <td className="whitespace-nowrap py-2 px-4">{peticion.equipo_nombre}</td>
                                <td className="py-2 px-4">{peticion.peticion_causa}</td>
                                <td className="whitespace-nowrap py-2 px-4">
                                    <button onClick={() => aceptaPeticion(peticion.equipo_id, peticion.peticion_id)} className="bg-primary hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                                        Aceptar
                                    </button>
                                    <button
                                        onClick={() => rechazaPeticion(peticion.peticion_id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                        Rechazar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default GestionPeticionesCese