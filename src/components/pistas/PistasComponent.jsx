import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import API_URL from '../functions/APIURL'

const Pistas = () => {
    const [pistas, setPistas] = React.useState([])
    useEffect(() => {
        {
            fetch(API_URL+'pistas')
                .then(response => response.json())
                .then(data => setPistas(data))
                .catch(error => console.error('Error:', error));
        }
    }, [])
    return (
        <section className='max-w-[1200px] mx-auto min-h-30 my-7'>
            <h1 className="text-center text-2xl font-bold mb-4">Pistas Disponibles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6 md:w-full mx-auto">
                {pistas.map(pista => (
                    <div key={pista.id} className="bg-white p-4 rounded hover:shadow-md flex flex-col h-full">
                        <h3 className="text-xl font-semibold mb-2 min-h-14">{pista.pista_nombre}</h3>
                        <div className="overflow-hidden rounded mb-2">
                            <img
                                src={pista.pista_foto}
                                alt={pista.pista_nombre}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                        <Link to={`/reservar/${pista.pista_id}`} className="bg-primary text-white text-center font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300 mt-auto">
                            Reservar
                            {/* Elaboramos un link que nos lleve a la pista en concreto para reservarla */}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Pistas