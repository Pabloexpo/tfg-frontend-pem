import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

const CantidadPartidosEquipo = (props) => {
    const [cantidad, setCantidad] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}getCantidadPartidos/${props.equipo}`)
            .then(response => response.json())
            .then(data => {
                setCantidad(data.cantidad[0])
            })
            .catch(error => {
                console.log('Error fetching cantidad partidos', error)
            })
    }, [props.equipo])

    //Elaboramos los datos que le vamos a pasar al PIE de chatJS
    const datos = {
        labels: ['Ganados', `Perdidos`],
        datasets: [
            {
                label: 'Partidos',
                data: [cantidad.ganados, cantidad.perdidos],
                backgroundColor: ['#0072CE', '#CCFF00'],
                borderColor: ['#0072CE', '#CCFF00'],
                borderWidth: 1
            }
        ]
    }
    return (
        <>
            {cantidad.length !== 0 ? (
                <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px]">
                    <Pie data={datos} />
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default CantidadPartidosEquipo