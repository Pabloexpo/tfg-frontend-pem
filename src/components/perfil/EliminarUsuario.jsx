import React, { useState, useEffect } from 'react'
import API_URL from '../functions/APIURL'
const EliminarUsuario = (props) => {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [idUusuario, setIdUsuario] = useState('')

    useEffect(() => {
        setIdUsuario(props.id)
    }, [props.id])

    const eliminarUsuario = (ev) => {
        ev.preventDefault()
        //Elaboramos la petición api que borra al usuario, será un DELETE
        fetch(API_URL + `deletePersona/${idUusuario}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                //Cerramos la variable que abre el modal 
                setModalAbierto(false)
                //Borramos los datos de LocalStorage
                localStorage.removeItem('access_token')
                localStorage.removeItem('equipo')
                localStorage.removeItem('usuario')
                localStorage.removeItem('id')
                localStorage.removeItem('rol')
                alert('Usuario eliminado correctamente')
                //Redirigimos a la página de inicio
                window.location.href = '/'
            })
            .catch(error => {
                console.error("Error en Eliminar el usuario:", error);
            });
    }
    const abrirModal = () => {
        setModalAbierto(true)
    }
    return (
        <>
            {/* Establecemos que el botón sea de tipo button para evitar el comportamiento por defecto del formulario */}
            <button
                type='button'
                className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300 m-auto"
                onClick={abrirModal}>
                Borrar usuario
            </button>
            {/* Si clicamos en el botón, abriremos un modal parecido al del mensaje, pero con texto diferente */}
            {modalAbierto && (
                <div className="fixed inset-0 bg-footer bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">
                            ¿Estás seguro de que quieres eliminar el usuario?
                        </h2>
                        <p className="mb-4 whitespace-pre-wrap">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center">
                            {/* Realizamos la confirmación de eliminación de usuario con este botón, que activará la función que elimina al usuario */}
                            <form>
                                <button
                                    onClick={ eliminarUsuario }
                                    className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300">
                                    Eliminar
                                </button>
                            </form>

                            <button
                                onClick={() => { setModalAbierto(false) }}
                                className="ml-3 py-2 px-4 rounded border border-gray-300 hover:bg-gray-100 transition duration-200">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EliminarUsuario