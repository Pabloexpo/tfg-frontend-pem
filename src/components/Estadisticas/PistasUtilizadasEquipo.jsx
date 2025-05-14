import React, { use } from 'react'
import API_URL from '../functions/APIURL'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const PistasUtilizadasEquipo = (props) => {
    //Vamos a realizar una tabla con las pistas utilizadas por el equipo
    const [pistas, setPistas] = useState([]);
    useEffect(() => {
        //Realizamos la llamada a la API para obtener las pistas utilizadas por el equipo
        fetch(`${API_URL}getPistasUtilizadas/${props.equipo}`)
            .then(res => res.json())
            .then(data => {
                setPistas(data.pistas_utilizadas)
                console.log(data.pistas_utilizadas)
            })
            .catch(err => console.error('Error al recoger las estadisticas:', err))
    }, [props.equipo])

  return (
    <>
        <h2 className="text-2xl font-bold mb-4">Histórico de pistas</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 border-b">Pista</th>
                    <th className="px-4 py-2 border-b">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {pistas.map((pista, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{pista.pista_nombre}</td>
                        <td className="px-4 py-2 border-b">{pista.cantidad}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default PistasUtilizadasEquipo