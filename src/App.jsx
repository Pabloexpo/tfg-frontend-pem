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

function App() {
  //Usamos browserRouter para manejar las rutas de la aplicación
  return (
    <BrowserRouter>
      <NavComponent />
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="/pistas" element={<Pistas />} />
        <Route path="/login" element={<LoginPageComponent />} />
        <Route path="/registro" element={<RegistroPageComponent />} />
        <Route path="/perfil" element={<PerfilComponent />} />
        <Route path="/reservar/:id" element={<PistaSeleccionada />} />
        <Route path="/estadisticas" element={<EstadisticasPageComponent />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter> 
  )
}

export default App
