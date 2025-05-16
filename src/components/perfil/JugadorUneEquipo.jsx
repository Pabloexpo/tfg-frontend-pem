import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'
const JugadorUneEquipo = () => {
    const [equipos, setEquipos] = React.useState([])
    //Estado para saber a qué equipo elegimos 
    const [equipoSeleccionado, setEquipoSeleccionado] = React.useState('')
    //Primero tenemos que mostrar los equipos disponibles para unirse a uno

    useEffect(() => {
        //Seteamos el nombre y el rol una vez al renderizar el componente, si lo pusieramos fuera, tendríamos un bucle infinito
        getEquipos();
      }, []);

    const getEquipos = () => {
        fetch(API_URL+'equipoNoJugadores')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setEquipos(data.equipos);
            })
            .catch(error => {
                console.error("Error en getEquipos:", error);
            });
    }
    const actualizarEquipo = (e) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                equipo_id: equipoSeleccionado,
                jugador_id: localStorage.getItem("id")
            })
        }
        fetch(API_URL+'insertaJugadorEquipo', options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                alert(data.message || "Unido al equipo correctamente");
                //Guardamos el equipo en el localStorage, el id
                localStorage.setItem("equipo", equipoSeleccionado)
                //Redirigimos a la página de perfil
                window.location.href = "/perfil"
            })
            .catch(error => {
                console.error("Error en actualizarEquipo:", error);
            });
    }
    const cambiarEquipo = (e) => {
        setEquipoSeleccionado(e.target.value)
        //Una vez seleccionado el equipo, lo guardamos en el localStorage
        localStorage.setItem("equipo", e.target.value)
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <label htmlFor="nombre" className='my-4'>Selecciona el equipo al que te quieres unir</label>
            <select id="selectEquipo" value={equipoSeleccionado} onChange={cambiarEquipo} className='w-full border-2 border-primary rounded p-2 m-2 hover:border-secondary'>
                <option value="">-- Selecciona un equipo --</option>
                {equipos.map(equipo => (
                    <option key={equipo.equipo_id} value={equipo.equipo_id}>
                        {equipo.equipo_nombre}
                    </option>
                ))}
            </select>
            <button className='bg-primary text-white font-bold py-2 px-4 my-2 rounded hover:bg-secondary hover:text-black transition duration-300 m-auto' onClick={actualizarEquipo}>Seleccionar Equipo</button>
        </div>
    )
}

export default JugadorUneEquipo