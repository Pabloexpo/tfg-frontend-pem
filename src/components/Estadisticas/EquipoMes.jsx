import React, { use } from 'react'
import API_URL from '../functions/APIURL'
import { useEffect, useState } from 'react'


const EquipoMes = () => {
    //Recuperamos el equipo del mes para mostrarlo en la página principal
    const [equipoMes, setEquipoMes]=useState(''); 
    const [victorias, setVictorias]=useState(''); 
    const mesNumero = new Date().getMonth(); 
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]; 
    const mesNombre = meses[mesNumero]
    useEffect(()=>{
        fetch(`${API_URL}getEquipoMes`)
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                setEquipoMes(data[0].mejor_equipo)
                setVictorias(data[0].victorias)
            })
    }, [])
  return (
    <section className='mx-auto grid grid-cols-1 gap-6 bg-white shadow-md rounded-lg p-6 w-5/6'>
        <h3 className='text-xl font-bold text-center'>Mejor equipo de {mesNombre}:</h3>
        <p className='text-xl font-bold text-center'>{equipoMes}</p>
        <p className='text-center'>Victorias: {victorias}</p>
        
    </section>
  )
}

export default EquipoMes