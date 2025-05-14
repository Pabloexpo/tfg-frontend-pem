import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CerrarSesion } from '../functions/CerrarSesion.jsx'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavComponent = () => {
  const [open, setOpen] = useState(false)

  //utilizamos una función flecha para cambiar el estado de la variable open, para saber si el menú hamburguesa está abierto o cerrado
  const toggleMenu = () => setOpen(!open)
  //la funciíon closeMenu se utiliza para cerrar el menú hamburguesa al hacer click en un elemento del menú
  const closeMenu = () => setOpen(false)

  return (
    <nav className='bg-primary p-4 shadow-lg sticky top-0 z-10'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        {/* Logo */}
        <div>
          <Link to="/">
            <img className='w-20' src="/logo-recortado.svg" alt="Logo" />
          </Link>
        </div>

        {/* Botón hamburguesa */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className="text-white">
            {/* establecemos el contenido del botón hamburguesa, si está abierto o cerrado */}
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menú en escritorio */}
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
          {localStorage.getItem('access_token') ? (
            <>
              <li className="hover:text-secondary">
                <a href="#about" onClick={CerrarSesion}>Cerrar sesión</a>
              </li>
              <li className="hover:text-secondary">
                <Link to="/perfil">Perfil</Link>
              </li>
            </>
          ) : (
            <li className="hover:text-secondary">
              <Link to="/login">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Menú móvil. En caso de que open sea true, metemos el menú hamburguesa */}
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
          {localStorage.getItem('access_token') ? (
            <>
              <li onClick={closeMenu} className="hover:text-secondary">
                <a href="#about" onClick={CerrarSesion}>Cerrar sesión</a>
              </li>
              <li onClick={closeMenu} className="hover:text-secondary">
                <Link to="/perfil">Perfil</Link>
              </li>
            </>
          ) : (
            <li onClick={closeMenu} className="hover:text-secondary">
              <Link to="/login">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  )
}

export default NavComponent
