import React, { useState } from 'react';
import { Tab } from 'flowbite';
import 'flowbite/dist/flowbite.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ErrorModal from "../component/ErrorModal";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setMessage("Login exitoso!");
        setShowErrorModal(false);
        router.push("/profile")
      } else {
        setMessage("Error en el inicio de sesión, verifica tus credenciales.");
        setShowErrorModal(true);
      }
    } catch (error) {
      setMessage("Error en la conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {showErrorModal && (
        <ErrorModal
          message={message}
          onClose={() => {
            setShowErrorModal(false);
          }}
        />
      )}
      <div className="flex w-full max-w-6xl">
        <div className="flex flex-col justify-center items-center p-4 bg-white rounded-md shadow-md w-1/2">
          <h1 className="text-3xl mb-4">Transmed</h1>
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Placeholder"
              className="w-32 h-32"
            />
          </div>
          <p className="text-center">
            Transmed tu servicio de transporte de medicinas de confianza
          </p>
        </div>
        <div className="container mx-auto p-4 bg-white rounded-md shadow-md w-1/2">
          <div className="relative">
            <div className="absolute right-0 top-0 mr-0 mt-4 space-x-0 border bg-gray-100 border-gray-300 rounded-md">
              <button className="px-3 py-1 rounded-md text-sm font-medium text-blue-600 bg-blue-100 border-l border-r hover:text-white hover:bg-blue-600 focus:outline-none">Sign In</button>
              <Link href="/SignUp_page">
                <button className="px-3 py-1 rounded-md text-sm font-medium text-gray-500 bg-gray-100 border-gray-300 hover:text-white hover:bg-blue-600 focus:outline-none">Sign Up</button>
              </Link>
            </div>
            <div className="pt-16">
              <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex justify-center">
                  <div className="w-1/2">
                    <input
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="w-1/2">
                    <input
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="w-1/2">
                    <input
                      className="mr-2 rounded"
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="text-sm" htmlFor="rememberMe">
                      Recordarme
                    </label>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    type="submit"
                  >
                    Iniciar sesión
                  </button>
                </div>
                {/* Mensaje de error */}
                <div className="flex justify-center mb-4">
                  <p className="text-red-600">{message}</p>
                </div>*/
                <div className="flex justify-center mb-4">
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100"
                    type="button"
                    onClick={() => {
                      // Aquí puedes manejar el inicio de sesión con Google
                      console.log('Iniciar sesión con Google');
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    Continuar con Google
                  </button>
                </div>
                <div className="text-center">
                  <a className="text-sm text-primary-600 hover:text-primary-500 underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>


  );
};

export default Login;
