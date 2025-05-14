import React from 'react'
import API_URL from '../functions/APIURL'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Importar los componentes de Chart.js para realizar gráficos
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
// Registramos los elementos de Chart.js que vamos a usar
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const GlobalesEquipo = (props) => {
  // Realizamos un array de los meses para poder mostrar el mes en formato texto
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    // Realizamos la llamada a la API para obtener las estadísticas del equipo
    fetch(`${API_URL}getPartidosEquipoStats/${props.equipo}`)
      .then(res => res.json())
      .then(data => {
        setEstadisticas(data.estadisticas)
        console.log(data.estadisticas)
      })
      .catch(err => console.error('Error al recoger las estadisticas:', err))
  }, [props.equipo])

  // Preparamos los datos para el gráfico circular
  const partidosGanados = estadisticas.reduce((acc, curr) => acc + curr.ganados, 0);
  const partidosPerdidos = estadisticas.reduce((acc, curr) => acc + curr.perdidos, 0);

  const data = {
    labels: ['Ganados', 'Perdidos'],
    datasets: [{
      label: 'Partidos',
      data: [partidosGanados, partidosPerdidos],
      backgroundColor: ['#0072CE', '#CCFF00'],  // Colores de cada sección
      borderColor: 'black',
      borderWidth: 1
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Partidos Ganados vs Perdidos',
        color: '#333333',
        font: { size: 18 }
      },
      legend: {
        labels: { color: '#333333' }
      },
      tooltip: {
        bodyColor: 'white',
        titleColor: 'white',
        backgroundColor: '#333333'
      }
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '2rem',
      marginBottom: '2rem'
    }}>
      <h2 className="text-2xl font-bold mb-4">Estadísticas globales</h2>
      <Pie data={data} options={options} />
    </div>
  )
}

export default GlobalesEquipo
