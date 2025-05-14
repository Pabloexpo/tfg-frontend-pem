import React from 'react'
import API_URL from '../functions/APIURL'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Importar los componentes de Chart.js para realizar gráficos
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  TimeScale,
  TimeSeriesScale,
} from 'chart.js'
import { Bar, Chart, Line } from 'react-chartjs-2'
//Registramos los elementos de Chart.js que vamos a usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  TimeScale,
  TimeSeriesScale
)


const HistoricoEquipo = (props) => {
  //Realizamos un array de los meses para poder mostrar el mes en formato texto
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  const [estadisticas, setEstadisticas] = useState([]);
  useEffect(() => {
    //Realizamos la llamada a la API para obtener las estadisticas del equipo
    fetch(`${API_URL}getPartidosEquipoStats/${props.equipo}`)
      .then(res => res.json())
      .then(data => {
        setEstadisticas(data.estadisticas)
        console.log(data.estadisticas)
      })
      .catch(err => console.error('Error al recoger las estadisticas:', err))
  }, [props.equipo])

  //Preparamos los datos para el gráfico de barras
  const data = {
    //Establecemos las etiquetas de los meses en el eje X
    //Utilizamos el array de meses para mostrar el mes en formato texto
    labels: estadisticas.map(s => meses[s.mes - 1]),
    datasets: [
      {
        //Establecemos los datos de los partidos ganados y perdidos
        label: 'Ganados',
        //Recogemos aqui los datos de la api de partidos ganados
        data: estadisticas.map(s => s.ganados),
        backgroundColor: '#0072CE',
        borderColor: 'black',
        borderWidth: 1
      },
      {
        label: 'Perdidos',
        //Recogemos aqui los datos de la api de partidos perdidos
        data: estadisticas.map(s => s.perdidos),
        backgroundColor: '#CCFF00',
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Partidos ganados vs perdidos ',
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
    },
    scales: {
      x: {
        ticks: { color: '#333333' },
        grid: { color: '#333333' }
      },
      y: {
        ticks: { color: '#333333' },
        grid: { color: '#333333' },
        beginAtZero: true
      }
    }
  };
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '2rem'
    }}>
      <h2 className="text-2xl font-bold mb-4">Histórico de Partidos</h2>
      <div className="w-full h-[300px]">
        {/* Ajustamos el tamaño del gráfico con clases responsivas */}
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default HistoricoEquipo