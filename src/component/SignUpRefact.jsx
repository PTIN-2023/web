// *Signup.jsx*
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSignup from '../hooks/useSignup';
import SignupForm from '../component/SignupForm';


//Cuerpo del SignUp
const Signup = () => {
    const { formData, handleChange, handleSubmit } = useSignup();
    const router = useRouter();

    const navigateToLogin = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex w-full max-w-6xl">
                {/* Primer contenedor (Transmed) */}
                <div className="container mx-auto p-4 bg-white rounded-md shadow-md w-1/2 flex flex-col items-center justify-center">
                    <h1 className="text-3xl mb-4 text-center">Transmed</h1>
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

                {/* Contenedor de registro */}
                <div className="container mx-auto p-4 bg-white rounded-md shadow-md w-1/2">
                    <div className="relative">
                        <div className="absolute right-0 top-0 mr-0 mt-4 space-x-0 border bg-gray-100 border-gray-300 rounded-md">
                            <Link href="/">
                                <button className="px-3 py-1 rounded-md text-sm font-medium text-gray-500 bg-gray-100 hover:text-white hover:bg-blue-600 focus:outline-none">Sign In</button>
                            </Link>
                            <button className="px-3 py-1 rounded-md text-sm font-medium text-blue-600 bg-blue-100 border-l border-r border-gray-300 hover:text-white hover:bg-blue-600 focus:outline-none">Sign Up</button>
                        </div>
                        <div className="pt-16">
                            <h1 className="text-3xl font-bold mb-6 text-center">Registro de paciente</h1>
                            <SignupForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                        </div>
                        <div className="mt-4 text-center">
                            <p>
                                ¿Ya tienes cuenta?{' '}
                                <button
                                    className="text-blue-600 hover:text-blue-500 focus:outline-none"
                                    onClick={navigateToLogin}
                                >
                                    Iniciar sesión
                                </button>
                            </p>
                        </div>
                        {/*...(El resto del código de la estructura del componente se mantiene igual)*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
