import React, {useEffect, useState} from 'react'
import API_URL from '../functions/APIURL'
const IntegrantesEquipo = ({ equipo }) => {
    const [integrantes, setIntegrantes] = useState([]); 

    useEffect(()=>{
        fetch(API_URL + 'getJugadoresEquipo/'+ equipo)
            .then(response => response.json())
            .then(data =>{
                setIntegrantes(data)
                console.log(data)
            })
            .catch((e) => console.log(e.message))
    }, [equipo])
  return (
    <div className='mb-5'>
        <h2>Integrantes del equipo: 
            {integrantes.map((integrante, index)=>
                <div key={index}>
                    <p>{integrante.jugadores}</p>
                </div>
            )}
        </h2>
    </div>
  )
}

export default IntegrantesEquipo