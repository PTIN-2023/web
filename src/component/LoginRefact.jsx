import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from './LoginForm';
import Link from 'next/link';
import {GoogleOAuthProvider} from '@react-oauth/google';


//Cuerpo del Login
const Login = ({props}) => {

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex w-full max-w-6xl">
                <div className="flex flex-col justify-center items-center p-4 bg-white rounded-md shadow-md w-1/2">
                    <div className="flex justify-center mb-4">
                        <img
                            src="media/logo/blanco.svg"
                            alt="TransMed"
                            className="w-[350px] h-[350px]"
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
                        </div>
                        <GoogleOAuthProvider clientId="692056364291-m1m2edfdtmjt69q2qrh1eshejauo900j.apps.googleusercontent.com">
                            <LoginForm />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
