import React from 'react'
import { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'

const ClasificacionGeneralComponent = ({ actualizarEquipoSeleccionado }) => {
    const [clasificacion, setClasificacion] = useState([])

    useEffect(() => {
        fetch(`${API_URL}clasificacionGeneral`)
            .then(response => response.json())
            .then(data => {
                setClasificacion(data.clasificacion)
                console.log(data.clasificacion)
            })
            .catch(error => {
                console.error('Error fetching clasificacion:', error)
            })
    }, [])

    return (
        <article className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 py-2 w-12">Posición</th>
                        <th className="border border-gray-300 px-4 py-2">Equipo</th>
                        <th className="border border-gray-300 px-2 py-2 w-20">Partidos Jugados</th>
                        <th className="border border-gray-300 px-2 py-2 w-20">Victorias</th>
                    </tr>
                </thead>
                <tbody>
                    {clasificacion.map((equipo, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="cursor-pointer hover:text-blue-500"
                                    onClick={() => {
                                        sessionStorage.setItem('equipoNombreSeleccionado', equipo.equipo_nombre)
                                        sessionStorage.setItem('equipoIdSeleccionado', equipo.equipo_id)
                                        actualizarEquipoSeleccionado() // Llamamos a la función del padre para actualizar el estado
                                    }}>
                                    {equipo.equipo_nombre}
                                </button>
                            </td>
                            <td className="border border-gray-300 px-2 py-2 text-center">{equipo.total_partidos_jugados}</td>
                            <td className="border border-gray-300 px-2 py-2 text-center">{equipo.partidos_ganados}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    )
}

export default ClasificacionGeneralComponent