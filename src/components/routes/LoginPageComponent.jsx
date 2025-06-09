import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUsuario } from '../functions/loginUsuario';
import { toast } from 'react-toastify';
import logo from '../../assets/logo-recortado.svg'; // Asegúrate de que la ruta sea correcta
const LoginPageComponent = () => {
    // Realizamos una funcion que redirige a la página de inicio en caso de login
    const volverInicio = () => {
        window.location.href = "/";
    }
    // Estados para los inputs, error y token 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);


    // Función que se ejecuta al enviar el formulario
    const envioForm = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Por favor, completa todos los campos');
            return
        }
        loginUsuario(email, password, setToken)
            .then(result => {
                if (!result.success) {
                    alert(result.error);
                    setError(result.error);
                }
            });
    };

    return (
        <main className="max-w-[1200px] flex flex-col min-h-100 h-auto mx-auto my-6 bg-white rounded-2xl shadow-md p-6 md:w-2/6 w-5/6 " >
            <div className='w-full flex flex-col justify-center items-center'>
                <h1 className="text-4xl font-bold text-center mt-10 mb-5">Iniciar sesión</h1>
                <img src={logo} alt="Logo" className="md:w-1/6 w-3/6 h-auto mb-5" />
            </div>

            {/* Hacemos el evento al hacer submit en el formulario */}
            <form onSubmit={envioForm} className='max-w-md m-auto flex flex-col  '>
                <div>
                    <input type="email" placeholder="Email" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full" />
                </div>
                <div>
                    <input type="password" placeholder="Contraseña" id="pwd" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full" />
                </div>
                <div className='flex flex-col justify-center items-center ml-4'>
                    <button type="submit" className="my-5 mx-auto w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300">
                        Iniciar sesión
                    </button>
                </div>
            </form>
            <div className='flex flex-col justify-center items-center'>
                <button type="submit" className="ml-4 bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300">
                    <Link to="/registro">Registrarse</Link>
                </button>
            </div>

            {error && (
                <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
                    {error}
                </div>
            )}

            {token && (
                <>
                    {/* En caso de haber token, volvemos a la página de inicio */}
                    {volverInicio()}
                </>
            )}
        </main>
    );
};

export default LoginPageComponent;
