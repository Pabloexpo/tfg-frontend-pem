import React from 'react'
import { Link } from 'react-router-dom';
const ExplicacionSistema = () => {
    return (
        <section className='mx-auto grid grid-cols-1 gap-6 bg-white shadow-md rounded-lg p-6 w-5/6 min-h-105'>

            <article className='flex flex-col justify-center space-y-3'>
                <p>Nuestro sistema de reservas de pistas a lo largo de Cartagena te permitirá comprobar las pistas de nuestro catálogo disponibles para poder jugar, así como los equipos disponibles actuales y la meteorología prevista para esa hora exacta.</p>
                <p>Siendo miembro y con equipo en activo, podrás comprobar tus estadísticas, tales como un histórico de partidos, un gráfico circular con el total de estos y la posibilidad de gestionar tus reservas</p>
                <p>¡Ven a descubrir todo lo que Padelistas Cartagena te ofrece!</p>
            </article>
            {localStorage.access_token ? (
                <div className='mx-auto' >
                    <Link to="/perfil">
                        <button className='bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300'>
                            Ver perfil
                        </button>
                    </Link>
                </div>
            ) : (
                <div className='mx-auto' >
                    <Link to="/registro">
                        <button className='bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300'>
                            Regístrate
                        </button>
                    </Link>
                </div>
            )}

        </section>
    )
}

export default ExplicacionSistema