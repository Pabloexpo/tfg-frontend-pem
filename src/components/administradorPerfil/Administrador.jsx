import React from 'react'
import GestionPeticionesCese from './GestionPeticionesCese'
import PartidosDisputados from './PartidosDisputados'
import MensajesRecibidos from './MensajesRecibidos'
const Administrador = () => {
    return (
        <section className="px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Panel de administrador</h1>
            <article className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Peticiones de cese</h3>
                <GestionPeticionesCese />
            </article>
            <article className="bg-white rounded-2xl shadow-md p-6 mt-6">
                <h3 className="text-xl font-semibold mb-2">Partidos disputados</h3>
                <PartidosDisputados />
            </article>
            <article className="bg-white rounded-2xl shadow-md p-6 mt-6">
                <h3 className="text-xl font-semibold mb-2">Gestión de usuarios</h3>
                <MensajesRecibidos />
            </article>
        </section>
    )
}

export default Administrador