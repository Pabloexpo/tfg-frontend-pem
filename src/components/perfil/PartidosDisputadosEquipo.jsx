import React, { useEffect, useState } from 'react';
import API_URL from '../functions/APIURL';
import left from '../../assets/Padel_Arrow_Left_Blue_Transparent.png';
import right from '../../assets/Padel_Arrow_Right_Blue_Transparent.png';
const PartidosDisputadosEquipo = ({ equipo }) => {
  const [partidos, setPartidos] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 9; //Ponemos 9 para hacer el grid de 3x3 en escritorio

  useEffect(() => {
    fetch(`${API_URL}partidosEquipo/${equipo}?page=${page}&per_page=${perPage}`)
      .then(res => res.json())
      .then(({ data, last_page }) => {
        setPartidos(data);
        setLastPage(last_page);
      })
      .catch(err => console.error('Error fetching partidos:', err));
  }, [equipo, page, lastPage]);
  useEffect(() => {
    // Al cambiar de equipo, reiniciamos a la primera página
    setPage(1);
  }, [equipo]);


  return (
    <section className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Partidos disputados</h1>

      {/* Grid responsivo: 1 columna en móvil, 2 en sm, 3 en md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {partidos.map(p => (
          <article
            key={p.id || `${p.partido_fecha}-${p.pista_nombre}`}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {new Date(p.partido_fecha).toLocaleString()}
              </h2>
              <p className="text-gray-600">{p.pista_nombre}</p>
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

      {/* Controles de paginación */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          <img src={left} className='w-10'></img>
        </button>
        <span>Página {page} de {lastPage}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page >= lastPage}
          onClick={() => setPage(page + 1)}
        >
          <img src={right} className='w-10'></img>
        </button>
      </div>
    </section>
  );
};

export default PartidosDisputadosEquipo;
