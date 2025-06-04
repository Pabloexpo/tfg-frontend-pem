import React, { use } from 'react'
import { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'
import { getArbitros } from '../functions/getArbitros'
import { toast } from 'react-toastify';
const PartidosDisputados = () => {
  const [reservas, setReservas] = useState([])
  const [arbitros, setArbitros] = useState([])
  //variables para la url de la api para insertar los partidos
  const [fecha, setFecha] = useState('');
  const [pista, setPista] = useState('');
  const [equipo1, setEquipo1] = useState('');
  const [equipo2, setEquipo2] = useState('');
  const [arbitro, setArbitro] = useState('');
  const [sets1, setSets1] = useState('');
  const [sets2, setSets2] = useState('');
  // Realizamos la llamada a la API para obtener los datos de las reservas que no estén finalizadas y que sean antes de la fecha actual, lo hacemos fuera del useEffect para que no se repita la llamada cada vez que se renderiza el componente
  const fetchReservas = () => {
    fetch(`${API_URL}getReservasNoFinalizadas`)
      .then(response => response.json())
      .then(data => {
        setReservas(data.reservas)
      })
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    fetchReservas();
    //Asignamos los árbitros
    getArbitros()
      .then(data => {
        setArbitros(data)
      })
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <div className="p-4">
      {/* hacemos responsive la tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left text-gray-600">Fecha</th>
              <th className="py-2 px-4 text-left text-gray-600">Pista</th>
              <th className="py-2 px-4 text-left text-gray-600">Equipo 1</th>
              <th className="py-2 px-4 text-left text-gray-600">Equipo 2</th>
              <th className="py-2 px-4 text-left text-gray-600">Árbitro</th>
              <th className="py-2 px-4 text-left text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.reserva_id} className="border-b">
                <td className="px-4 py-2 whitespace-nowrap">{reserva.reserva_fecha}</td>
                <td className="px-4 py-2 whitespace-nowrap">{reserva.pista_nombre}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div>{reserva.equipo1_nombre}</div>
                  <div className="mt-1">
                    <input
                      type="number"
                      min="0" max="3"
                      className="border px-2 py-1 mt-1 w-full"
                      placeholder='Sets'
                      onChange={e => setSets1(e.target.value)}
                    />
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div>{reserva.equipo2_nombre}</div>
                  <div className="mt-1">
                    <input
                      type="number"
                      min="0" max="3"
                      className="border px-2 py-1 mt-1 w-full"
                      placeholder='Sets'
                      onChange={e => setSets2(e.target.value)}
                    />
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <select
                    className="border px-2 py-1 w-full"
                    onChange={e => setArbitro(e.target.value)}
                  >
                    {arbitros.map(a => (
                      <option key={a.persona_id} value={a.persona_id}>
                        {a.persona_nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center">
                  <button
                    className="bg-primary hover:bg-secondary hover:text-text text-white px-4 py-2 rounded"
                    onClick={e => {
                      e.preventDefault();
                      fetch(`${API_URL}registraPartido`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          partido_fecha: reserva.reserva_fecha,
                          partido_pista: reserva.pista_id,
                          partido_equ_1: reserva.equipo1_id,
                          partido_equ_2: reserva.equipo2_id,
                          partido_arbitro: arbitro,
                          partido_sets_equ_1: sets1,
                          partido_sets_equ_2: sets2,
                          reserva_id: reserva.reserva_id
                        }),
                      })
                        .then(response => response.json())
                        .then(data => {
                          //Refrescamos la lista de reservas después de insertar el partido
                          fetchReservas();
                          toast.success('Partido insertado correctamente');
                        })
                        .catch(error => {
                          console.error('Error al insertar el partido:', error);
                        });
                    }}
                  >
                    Validar encuentro
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default PartidosDisputados