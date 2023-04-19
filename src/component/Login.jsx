import React, { useState } from 'react';
import 'flowbite/dist/flowbite.min.css';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la autenticación
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4 bg-white rounded-md shadow-md">
        <h1 className="text-3xl mb-6 text-center">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">
                Correo electrónico
            </label>
            <input
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="password">
                Contraseña
            </label>
            <input
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div className="flex items-center mb-4">
                <input
                className="mr-2"
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="text-sm" htmlFor="rememberMe">
                Recordarme
                </label>
            </div>
            <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                type="submit"
                >
                Iniciar sesión
            </button>
            <button
                className="w-full flex items-center justify-center px-4 py-2 mt-4 bg-white text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100"
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
            <div className="mt-4 text-center">
                <a className="text-sm text-primary-600 hover:text-primary-500 underline">
                ¿Olvidaste tu contraseña?
                </a>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
