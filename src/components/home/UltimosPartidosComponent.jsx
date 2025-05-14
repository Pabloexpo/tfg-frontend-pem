import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL';

const UltimosPartidosComponent = () => {
    const [partidos, setPartidos] = useState([])
    useEffect(()=>{
        fetch (`${API_URL}getUltimosPartidos`)
            .then(response => response.json())
            .then(data => setPartidos(data.partidos))
            .catch(e => console.log(e.message))
    },[])
    return (
        <section className='w-5/6 mx-auto md:w-full'>
            <h2 className="text-2xl font-bold mb-6">Últimos partidos disputados</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {partidos.map(p => (
          <article
            key={p.id || `${p.partido_fecha}-${p.pista_nombre}`}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {new Date(p.partido_fecha).toLocaleString()}
              </h2>
              <p className="text-gray-600">{p.pista}</p>
            </div>
            <div className="mb-4 space-y-1">
              <p className="text-gray-700"><span className="font-medium">Resultado:</span></p>
              <p className="text-gray-700">
                <strong>{p.local}</strong> – {p.partido_sets_equ_1}
              </p>
              <p className="text-gray-700">
                <strong>{p.visitante}</strong> – {p.partido_sets_equ_2}
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

export default UltimosPartidosComponent