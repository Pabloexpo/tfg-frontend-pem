import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL';

const ProximosPartidosComponent = () => {
    const [partidos, setPartidos] = useState([])
    useEffect(()=>{
        fetch (`${API_URL}getProximosPartidos`)
            .then(response => response.json())
            .then(data => setPartidos(data.partidos))
            .catch(e => console.log(e.message))
    },[])
    return (
        <section className='w-5/6 mx-auto md:w-full'>
            <h2 className="text-2xl font-bold mb-6">Próximos partidos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {partidos.map(p => (
          <article
            key={p.id || `${p.reserva_fecha}-${p.pista}`}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {new Date(p.reserva_fecha).toLocaleString()}
              </h2>
              <p className="text-gray-600">{p.pista}</p>
            </div>
            <div className="mb-4 space-y-1">
              <p className="text-gray-700">
                <strong>{p.equipo_1}</strong> - <strong>{p.equipo_2}</strong>
              </p>
              {p.arbitro && (
                <p className="text-gray-700">
                  <span className="font-medium">Árbitro:</span> {p.arbitro}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
        </section>
    )
}

export default ProximosPartidosComponent