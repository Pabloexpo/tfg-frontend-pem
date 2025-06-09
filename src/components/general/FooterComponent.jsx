import React from 'react';
import facebookIcon from '../../assets/footer-icons/facebook-tfg.png';
import instaIcon from '../../assets/footer-icons/insta-tfg.png';
import whatsappIcon from '../../assets/footer-icons/whatsapp-tfg.png';
import logo from '../../assets/logo-recortado.svg';
const FooterComponent = () => {
    return (
        <footer className='bg-footer py-10 px-3'>
            <section className='flex justify-evenly items-center flex-col md:flex-row'>
                <article className='text-white'>
                    <img src={logo} className='w-40 mb-5' alt="Logo de padelistas" />
                </article>

                <article className='flex justify-center w-full md:w-auto mb-5 md:mb-0'>
                    <a href='https://creativecommons.org/licenses/by/4.0/deed.es' target='_blank'>
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/CC_BY-SA_icon.svg/2560px-CC_BY-SA_icon.svg.png'
                            className='w-28 md:w-24'
                            alt="Licencia Creative Commons"
                        />
                    </a>
                </article>
                <article className='flex space-x-4'>
                    <a href="#" className="hover:opacity-80 transition duration-300">
                        <img
                            src={facebookIcon}
                            className='w-8 h-8'
                            alt="icono facebook"
                        />
                    </a>
                    <a href="#" className="hover:opacity-80 transition duration-300">
                        <img
                            src={instaIcon}
                            className='w-8 h-8'
                            alt="icono instagram"
                        />
                    </a>
                    <a href="#" className="hover:opacity-80 transition duration-300">
                        <img
                            src={whatsappIcon}
                            className='w-8 h-8'
                            alt="icono whatsapp"
                        />
                    </a>
                </article>
            </section>
            <section className='text-white text-center mt-4'>
                <p>&copy; 2025 Padelistas Cartagena. Todos los derechos reservados.</p>
            </section>
        </footer>
    );
};
export default FooterComponent;