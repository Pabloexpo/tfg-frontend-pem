import API_URL from "./APIURL";
const getEquiposLibres = () => {
    //retornamos el fetch -> Recogemos los equipos libres y que no sean el nuestro
    return fetch(`${API_URL}equipos/${localStorage.equipo}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            return []; // Devuelve un array vacío en caso de error para evitar que falle el `.then`
        });
}

export default getEquiposLibres;

