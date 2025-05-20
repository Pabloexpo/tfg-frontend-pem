import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'
import getEquiposLibres from '../functions/getEquiposLibres';

const ContrincanteComponent = ( props ) => {
    const [equiposLibres, setEquiposLibres] = useState([]);
    const [equipo2, setEquipo2] = useState('');
    const [reservaFinalizada, setReservaFinalizada] = useState(false); 

    useEffect(() => {
        getEquiposLibres()
            .then(data => {
                setEquiposLibres(data.equipos);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const reservaPista = () => {
        const body = {
            fecha: props.fecha,
            hora: props.hora,
            pista: props.pista,
            equipo_1: localStorage.equipo,
            equipo_2: equipo2,
        };

        fetch(API_URL + "reservarPista", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        .then(res => res.json())
        .then(data => {
            console.log("La pista ha sido reservada", data);
            setReservaFinalizada(true);
        })
        .catch(error => console.error("Error:", error));
    };

    return (
        <>
            { !reservaFinalizada ? (
                <div className='flex justify-between items-center'>
                    <select
                        className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-4/5"
                        onChange={e => setEquipo2(e.target.value)}
                        value={equipo2}
                    >
                        <option value="">Selecciona un equipo</option>
                        {equiposLibres.map(e => (
                            <option key={e.equipo_id} value={e.equipo_id}>
                                {e.equipo_nombre}
                            </option>
                        ))}
                    </select>
                    { equipo2 ? (
                        <button
                            className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300"
                            onClick={reservaPista}
                        >
                            Reservar
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div className="p-4 bg-green-100 rounded">
                    <p className="font-medium">¡Reserva finalizada con éxito!</p>
                </div>
            )}
        </>
    )
}

export default ContrincanteComponent;
