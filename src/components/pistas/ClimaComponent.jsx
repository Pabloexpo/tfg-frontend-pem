import React, { useEffect, useState } from 'react';

const ClimaComponent = (props) => {
    const [climaTexto, setClimaTexto] = useState('');
    const [climaIcono, setClimaIcono] = useState('');
    const [avisoNoCLima, setAvisoNoClima] = useState('');

    useEffect(() => {


        //Pasamos al fetch el dia con la localidad elegida
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=e6f299f3df0e4199907131549252104&q=${props.localidad},Spain&dt=${props.fecha}`)
            .then(response => response.json())
            .then(data => {
                //La api nos va a devolver un array de horas, tenemos que elegir la hora que pasamos por props
                const horaSeleccionada = data.forecast.forecastday[0].hour.find(h => h.time.includes(props.hora));
                if (horaSeleccionada) {
                    setClimaTexto(horaSeleccionada.condition.text);
                    setClimaIcono(horaSeleccionada.condition.icon);
                } else {
                    setAvisoNoClima('No hay información climática disponible para la hora seleccionada.');
                }
            })
            .catch(error => console.error('Error:', error));
    }, [props.fecha, props.hora, props.localidad]);

    return (
        <div>
            {climaIcono ? (
                <img src={climaIcono} alt={`Clima previsto para ${props.localidad}`} />
            ) : (
                <p>{avisoNoCLima}</p>
            )}
        </div>
    );
};

export default ClimaComponent;
