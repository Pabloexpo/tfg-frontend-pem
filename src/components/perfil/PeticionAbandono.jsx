import React, {use}from 'react'
import API_URL from '../functions/APIURL';
const PeticionAbandono = (props) => {
    const [motivo, setMotivo] = React.useState('');
    const [exito, setExito] = React.useState(false);
    //Realizamos una funcion que ejecutamos al mandar el formulario
    const enviarPeticion = (e) => {
        e.preventDefault();
        const options={
            method: 'POST', 
            headers:{
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                "peticion_causa": motivo,
                "peticion_equipo": props.equipo,
            })
        }
        //Realizamos la llamada a la API para enviar la petición de abandono
        fetch (`${API_URL}peticionCese`, options)
            .then(response => response.json())
            .then(data => {
                setExito(true);
            })
            .catch(error => console.error('Error:', error));
    }
  return (
    <form onSubmit={enviarPeticion} className='flex flex-col'>
        <textarea onChange={(e) => setMotivo(e.target.value)} value={motivo}  placeholder='¿Cuál es el motivo de la petición?' className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full"></textarea>
        <button className="bg-primary text-white font-bold py-2 px-4 my-2 rounded hover:bg-secondary hover:text-black transition duration-300 m-auto">Enviar Petición</button>
        {exito && <p className='text-green-500'>Petición enviada correctamente</p>}
    </form>
  )
}

export default PeticionAbandono