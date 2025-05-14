import React from 'react';

const FooterComponent = () => {
    return (
        <footer className='bg-footer py-10 px-3'>
            <section className='flex justify-around items-center flex-col md:flex-row m-3'>
                <article className='text-white'>
                    <img src="/logo-recortado.svg" className='w-40 mb-5' alt="Logo de padelistas" />
                </article>
                <article className='flex space-x-4'>
                    <a href="#" className="hover:opacity-80 transition duration-300">
                        <img
                            src="/footer-icons/facebook-tfg.png"
                            className='w-8 h-8'
                            alt="icono facebook"
                        />
                    </a>
                    <a href="#" className="hover:opacity-80 transition duration-300">
                        <img
                            src="/footer-icons/insta-tfg.png"
                            className='w-8 h-8'
                            alt="icono instagram"
                        />
                    </a>
                    <a href="#" className="hover:opacity-80 transition duration-300">
                        <img
                            src="/footer-icons/whatsapp-tfg.png"
                            className='w-8 h-8'
                            alt="icono whatsapp"
                        />
                    </a>
                </article>
            </section>
            <section className='text-white text-center'>
                <p>&copy; 2025 Padelistas Cartagena. Todos los derechos reservados.</p>
            </section>
        </footer>
    );
};

export default FooterComponent;