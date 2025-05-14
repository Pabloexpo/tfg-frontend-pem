import React, { use, useEffect } from 'react'

const ClimaComponent = (props) => {
    //En este componente vamos a mostrar el clima con las props que nos vienen del Calendario, es decir la fecha, la hora y la localidad
    const [climaTexto, setClimaTexto] = React.useState('');
    const [climaIcono, setClimaIcono] = React.useState('');
    useEffect(() => {
        console.log(props.localidad)
        //Llamamos a la api del tiempo para obtener el clima -> LO HAREMOS CON LAS PROPS QUE RECIBIMOS y una api key obtenida de fuera
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=e6f299f3df0e4199907131549252104&q=${props.localidad},Spain&dt=${props.fecha}&hour=${props.hora}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.current)
                console.log(props.fecha, props.hora, props.localidad)
                setClimaTexto(data.current.condition.text);
                setClimaIcono(data.current.condition.icon);

            })
            .catch(error => console.error('Error:', error));
    }, [])
    return (
        <div>
            <img src={climaIcono} alt={`CLima previsto para ${props.localidad}`} />
        </div>
    )
}
export default ClimaComponent