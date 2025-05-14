import API_URL from "./APIURL";
export function getArbitros() {
    return fetch(`${API_URL}getArbitros`)
        .then(response => response.json())
        .then(data => {
            return data.arbitros;
        })
        .catch(error => {
            console.error('Error:', error);
            return null; 
        });
}