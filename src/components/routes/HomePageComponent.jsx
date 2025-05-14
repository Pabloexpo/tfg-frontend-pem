import React from 'react'
import BienvenidaComponent from '../home/BienvenidaComponent'
import PistaBienvenida from '../home/PistaBienvenida'
import Presentacion from '../home/Presentacion'
import FormContacto from '../general/FormContacto'
import ExplicacionSistema from '../home/ExplicacionSistema'
import EquipoMes from '../Estadisticas/EquipoMes'
import PistaMasUtilizada from '../Estadisticas/PistaMasUtilizada'
import UltimosPartidosComponent from '../home/UltimosPartidosComponent'
import ProximosPartidosComponent from '../home/ProximosPartidosComponent'

const HomePageComponent = () => {
  return (
    <div>
      <BienvenidaComponent />
      <main className="grid grid-cols-1 md:grid-cols-2 gap-1 py-5 max-w-[1200px] mx-auto">
        <div className="row-span-1 col-span-2 md:col-span-1 py-3">
          <Presentacion />
        </div>
        <div className="row-span-1 col-span-2 md:col-span-1 py-3">
          <PistaBienvenida />
        </div>
        <div className="row-span-1 col-span-2 md:col-span-1 py-3">
          <ExplicacionSistema />
        </div>
        <div className="row-span-1 col-span-2 md:col-span-1 py-3">
          <section className="grid grid-cols-1 md:grid-cols-1 mx-auto">
            <EquipoMes />
            <PistaMasUtilizada />
          </section>
        </div>
        <div className="row-span-1 col-span-2 py-3">
          <UltimosPartidosComponent />
        </div>
        <div className="row-span-1 col-span-2 py-3">
          <ProximosPartidosComponent />
        </div>
        <div className="row-span-1 col-span-2 py-3">
          <FormContacto inicio={true} />
        </div>
      </main>
    </div>
  )
}

export default HomePageComponent