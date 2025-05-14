import React, { useState, useEffect, use } from 'react'
import getEquiposLibres from '../functions/getEquiposLibres';
import  ClimaComponent  from './ClimaComponent';
import API_URL from '../functions/APIURL'

const CalendarioComponent = (props) => {
    //Importante -> tenemos que recuperar la pista que nos viene dada en el componente padre
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [equipo1, setEquipo1] = useState('');
    const [equipo2, setEquipo2] = useState('');
    const [pista, setPista] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [equiposLibres, setEquiposLibres] = useState([]);
    //Añadimos un estado para la disponibilidad de la pista, lo iniciamos a false 
    const [disponible, setDisponible] = useState();
    //Añadimos un estado para la reserva de la pista, lo iniciamos a false
    const [reservada, setReservada] = useState(false);

    useEffect(() => {
        setEquipo1(localStorage.getItem("equipo"));
        // Obtenemos la localidad de la prop
        setLocalidad(props.pista.pista_localidad);
        setPista(props.pista.pista_id);
    }, [props.pista]);

    useEffect(() => {
        getEquiposLibres()
            .then(data => {
                setEquiposLibres(data.equipos);
                console.log("Equipos libres:", data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const compruebaPista = (e) => {
        e.preventDefault();
        const body = {
            fecha: fecha,
            hora: hora,
            pista: pista
        };
        fetch(API_URL+"comprobarPista", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.disponiblidad == false) {
                    console.log("La pista no está disponible")
                    setDisponible(false);
                }
                else {
                    console.log("La pista está disponible")
                    setDisponible(true);
                }
            })
            .catch(error => console.error('Error:', error));
    }
    const reservaPista = (e) => {
        console.log(`${pista} ${fecha} ${hora} ${equipo1} ${equipo2}`);
        const body = {
            fecha: fecha,
            hora: hora,
            pista: pista,
            equipo_1: equipo1,
            equipo_2: equipo2,
        };

        fetch(API_URL+"reservarPista", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                setReservada(true);
                setDisponible(false);
                console.log("La pista ha sido reservada", data);
            })
            .catch((error) => console.error("Error:", error));
    };
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <form onSubmit={compruebaPista} >
                <input type="date" name="" id="" className='border-2 border-primary rounded p-2 m-2 hover:border-secondary'
                    onChange={(e) => setFecha(e.target.value)} value={fecha} />
                <select className="border-2 border-primary rounded p-2 m-2 hover:border-secondary"
                    onChange={(e) => setHora(e.target.value)} value={hora}>
                    <option value="">Selecciona una hora</option>
                    <option value="10:00">10:00</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                    <option value="18:00">18:00</option>
                    <option value="20:00">20:00</option>
                    <option value="22:00">22:00</option>
                </select>
                {/* Aquí vamos a poner un select con los equipos libres, que nos devuelva el id del equipo seleccionado */}
                <select className="border-2 border-primary rounded p-2 m-2 hover:border-secondary"
                    onChange={(e) => setEquipo2(e.target.value)} value={equipo2}>
                    <option value="">Selecciona un equipo</option>
                    {equiposLibres.map((equipo) => (
                        <option key={equipo.equipo_id} value={equipo.equipo_id}>
                            {equipo.equipo_nombre}
                        </option>
                    ))}
                </select>
                <button className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300 m-auto"
                >Comprobar disponiblidad</button>
            </form>
            <article className='flex flex-col justify-center items-center'>
                {/* Aquí vamos a mostrar la disponibilidad de la pista, si está disponible o no, junto con el tiempo que hará para esa fecha */}
                {disponible === true && (
                    <>
                        <ClimaComponent fecha={fecha} hora={hora} localidad={localidad}/>
                        <p className="text-green-600 font-semibold mt-4">La pista está disponible a esa hora.</p>
                        <button
                            onClick={reservaPista}
                            className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black hover:cursor-pointer transition duration-300 mt-4">
                            Reservar
                        </button>
                    </>

                )}

                {(disponible === false && reservada === false) && (
                    <p className="text-red-600 font-semibold mt-4">La pista no está disponible a esa hora.</p>
                )}
                {(reservada === true && disponible === false) && (
                    <div>
                        <p className="text-green-600 font-semibold mt-4">La pista ha sido reservada para el día {fecha} a las {hora}Hrs.</p>
                    </div>

                )}
            </article>

        </section>
    )
}

export default CalendarioComponent