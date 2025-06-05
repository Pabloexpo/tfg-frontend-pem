import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CerrarSesion } from '../functions/CerrarSesion.jsx';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo-recortado.svg';
const NavComponent = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [hayLogin, setHayLogin] = useState(localStorage.getItem('access_token') !== null);

  // Actualiza el estado cuando cambia la ruta (por ejemplo, después del registro y navigate('/'))
  useEffect(() => {
    setHayLogin(localStorage.getItem('access_token') !== null);
  }, [location]);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav className='bg-primary p-4 shadow-lg sticky top-0 z-10'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <div>
          <Link to="/">
            <img className='w-20 logo-bote' src={logo} alt="Logo" />
          </Link>
        </div>

        <div className='md:hidden'>
          <button onClick={toggleMenu} className="text-white">
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menú de escritorio */}
        <ul className="hidden md:flex space-x-6 text-white font-semibold">
          <li className="hover:text-secondary">
            <Link to="/">Inicio</Link>
          </li>
          <li className="hover:text-secondary">
            <Link to="/pistas">Pistas</Link>
          </li>
          <li className="hover:text-secondary">
            <Link to="/estadisticas">Estadísticas</Link>
          </li>
          {hayLogin ? (
            <>
              <li className="hover:text-secondary">
                <a onClick={CerrarSesion} className='cursor-pointer'>Cerrar sesión</a>
              </li>
              <li className="hover:text-secondary">
                <Link to="/perfil">Perfil</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-secondary">
                <Link to="/login">Iniciar sesión</Link>
              </li>
              <li className="hover:text-secondary">
                <Link to="/registro">Registro</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Menú móvil */}
      {open && (
        <ul className="md:hidden mt-4 flex flex-col space-y-4 text-white font-semibold">
          <li onClick={closeMenu} className="hover:text-secondary">
            <Link to="/">Inicio</Link>
          </li>
          <li onClick={closeMenu} className="hover:text-secondary">
            <Link to="/pistas">Pistas</Link>
          </li>
          <li onClick={closeMenu} className="hover:text-secondary">
            <Link to="/estadisticas">Estadísticas</Link>
          </li>
          {hayLogin ? (
            <>
              <li onClick={closeMenu} className="hover:text-secondary">
                <a onClick={CerrarSesion}>Cerrar sesión</a>
              </li>
              <li onClick={closeMenu} className="hover:text-secondary">
                <Link to="/perfil">Perfil</Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={closeMenu} className="hover:text-secondary">
                <Link to="/login">Iniciar sesión</Link>
              </li>
              <li onClick={closeMenu} className="hover:text-secondary">
                <Link to="/registro">Registro</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavComponent;
