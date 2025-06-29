import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import NavComponent from './components/general/NavComponent.jsx'
import FooterComponent from './components/general/FooterComponent.jsx'
import Pistas from './components/routes/PistasPageComponent.jsx'
import HomePageComponent from './components/routes/HomePageComponent.jsx';
import LoginPageComponent from './components/routes/LoginPageComponent.jsx';
import RegistroPageComponent from './components/routes/RegistroPageComponent.jsx';
import PerfilComponent from './components/perfil/PerfilComponent.jsx';
import PistaSeleccionada from './components/pistas/PistaSeleccionada.jsx';
import EstadisticasPageComponent from './components/routes/EstadisticasPageComponent.jsx';

//implementamos la libreria de toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //Usamos browserRouter para manejar las rutas de la aplicación
  return (
    //Usamos el div con min-h-screen para que el footer siempre esté al final de la página
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        {/* Implementamos el componente de navegación, al que le pasamos una key para que se desmonte y vuelva a montar al tener token */}
        <NavComponent />
        {/* Implementamos el ToastContainer con sus props para mostrar notificaciones */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored" />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePageComponent />} />
            <Route path="/pistas" element={<Pistas />} />
            <Route path="/login" element={<LoginPageComponent />} />
            <Route path="/registro" element={<RegistroPageComponent />} />
            <Route path="/perfil" element={<PerfilComponent />} />
            <Route path="/reservar/:id" element={<PistaSeleccionada />} />
            <Route path="/estadisticas" element={<EstadisticasPageComponent />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  )
}

export default App
