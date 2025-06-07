import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../functions/loginUsuario';
import API_URL from '../functions/APIURL';
import { toast } from 'react-toastify';

const RegistroPageComponent = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [rol, setRol] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [errorSpan, setErrorSpan] = useState(''); // Cambia a una cadena vacía para manejar el mensaje de error
  const [hiddenSpan, setHiddenSpan] = useState('')

  const navigate = useNavigate();

  const crearUsuario = (event) => {
    event.preventDefault(); // Detiene el envío del formulario

    // Validación de campos
    if (!nombre || !email || !password || !password2 || !rol) {
      toast.error("Por favor, completa todos los campos");
      return;
    }
    const regexPwd = /^(?=.*\d).{6,}$/
    if (!regexPwd.test(password)) {
      toast.error("La contraseña debe tener al menos 6 caracteres y un número");
      return;
    }
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.test(email)) {
      toast.error("Por favor, introduce un email válido");
      return;
    }


    if (password !== password2) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Si pasa la validación, realiza el fetch
    fetch(API_URL + "nuevoUsuario", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        persona_nombre: nombre,
        persona_email: email,
        persona_rol: rol,
        persona_pwd: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al registrar el usuario");
        }
        return response.json();
      })
      .then((data) => {
        loginUsuario(email, password, setToken)
          .then(result => {
            if (!result.success) {
              alert(result.error);
              setError(result.error);
            } else {
              localStorage.setItem('registro_exitoso', 'true'); //Registramos que nos hemos registrado para actualizar la página principal y mostrar
              navigate('/');

            }
          });
        // navigate('/'); // Redirigimos al usuario a la página de inicio de sesión
      })
      .catch((err) => {
        console.error("Error al registrar el usuario:", err);
        setError("El email de usuario ya está en uso, utiliza otro");
      });
  };

  return (
    <main className="max-w-[1600px] min-h-[70vh] flex items-center justify-center mx-auto bg-white rounded-2xl shadow-md p-6 m-4 md:w-2/6 w-5/6">
      <form onSubmit={crearUsuario} className="max-w-md m-auto my-4">
        <h2 className='text-2xl my-3'>Regístrate en Padelistas Cartagena!</h2>
        <div>
          <input
            type="text"
            placeholder="Nombre completo"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full" />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full" />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            id="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setHiddenSpan("* Deberá contener: seis caracteres, con un número")}
            onBlur={() => setHiddenSpan("")}
            className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full" />
        </div>
        <div>
          <input
            type="password"
            placeholder="Por favor, repite la contraseña"
            id="pwd2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full" />
        </div>
        <div>
          <select
            name="seleccionRol"
            id="seleccionRol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="border-2 border-primary rounded p-2 m-2 hover:border-secondary w-full">
            <option value="">Selecciona un rol</option>
            <option value="2">Jugador</option>
            <option value="3">Árbitro</option>
          </select>
        </div>
        <div className='flex flex-col w-full'>
          {/* Mostramos requisito de contraseña al clicar */}
          {hiddenSpan && (
            <p className="text-sm text-gray-600 px-2 py-1 bg-yellow-100 border border-yellow-400 rounded my-1">
              {hiddenSpan}
            </p>
          )}
          {/* Muestra el mensaje de error si existe */}
          {errorSpan && (
            <p className="text-red-500 text-sm text-center px-2 py-1">{errorSpan}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center px-2 py-1">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary hover:text-black transition duration-300 m-auto mx-0.5">
          Registrarse
        </button>
      </form>
    </main>
  );
};

export default RegistroPageComponent;
