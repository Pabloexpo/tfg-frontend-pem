import React from 'react'
import welcomeImg from '../../assets/img-bienvenida.webp';
const Presentacion = () => {
    return (
        <section className='max-w-[1200px] mx-auto grid grid-cols-1 gap-6 bg-white shadow-md rounded-lg p-6 w-5/6'>
            <article>
                <p>Padelistas Cartagena es una aplicación web diseñada para facilitar la reserva de pistas de pádel en Cartagena. Con una interfaz intuitiva y fácil de usar, los usuarios pueden buscar y reservar pistas en diferentes clubes de la ciudad, comparar estadísticas y disfrutar de una experiencia de juego sin complicaciones.</p>
                <p>La aplicación está diseñada para ser accesible y útil tanto para jugadores experimentados como para principiantes, brindando información clara sobre las instalaciones y servicios disponibles en cada pista.</p>
                <p>¡Únete a nosotros y disfruta del pádel en Cartagena!</p>
            </article>
            <article className='flex justify-center items-center'>
                <img src={welcomeImg} alt="Pista de bienvenida" className='w-full max-w-md rounded-lg' />
            </article>
        </section>
    )
}

export default Presentacion