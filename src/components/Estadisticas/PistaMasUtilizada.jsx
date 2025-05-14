import React, { use } from 'react'
import API_URL from '../functions/APIURL'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PistaMasUtilizada = () => {
    const [pista, setPista] = useState('');
    const [cantidad, setCantidad] = useState('');
    useEffect(() => {
        fetch(`${API_URL}getPistaMasUtilizada`)
            .then(response => response.json())
            .then(data =>{
                setPista(data[0].pista_nombre)
                setCantidad(data[0].veces_usada); 
            })
    }, []);
    return (
        <section className='mx-auto grid grid-cols-1 gap-6 bg-white shadow-md rounded-lg p-6 w-5/6 my-2'>
            <h3 className='text-xl font-bold text-center'>Pista más utilizada:</h3>
            <p className='text-xl font-bold text-center'>{pista}</p>
            <p className='text-center'>{cantidad} partidos </p>
            <div className='mx-auto' >
          <Link to="/pistas">
            <button className='bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300'>
              ¡Visita todas nuestras pistas!
            </button>
          </Link>
        </div>
        </section>
    )
}

export default PistaMasUtilizada