import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../functions/APIURL';

const PistaBienvenida = () => {
  const [pista, setPista] = useState({});

  useEffect(() => {
    // Generamos un random entre los números id posibles de pistas
    const randomId = Math.floor(Math.random() * 9) + 1;
    console.log('Pidiendo pista con id:', randomId);

    fetch(`${API_URL}pista/${randomId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPista(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <section className='mx-auto grid grid-cols-1 gap-6 bg-white shadow-md rounded-lg p-6 w-5/6 '>
      <article className='flex justify-center'>
        <img
          src={pista.pista_foto}
          alt={pista.pista_nombre}
          className="w-full max-w-md object-cover rounded-lg"
        />
      </article>
      <article className='flex flex-col justify-center space-y-3 h-47'>
        <h2 className='text-2xl font-bold text-center'>¡Reserva en una de nuestras pistas!</h2>
        <p className='text-lg font-medium text-center'>{pista.pista_nombre}</p>
        <div className='mx-auto' >
          <Link to="/pistas">
            <button className='bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300'>
              ¡Visita todas nuestras pistas!
            </button>
          </Link>
        </div>
      </article>
    </section>
  );
}

export default PistaBienvenida;