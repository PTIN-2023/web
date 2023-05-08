import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Signup = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Comprueba si las contraseñas coinciden
        if (password !== confirmPassword) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    username,
                    email,
                    phone,
                    city,
                    address,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al registrarse. Por favor, inténtalo de nuevo.');
            }

            console.log('Registrado con éxito');
            router.push("/")
        } catch (error) {
            console.error(error);
        }
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
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
                                        <input
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nombre Real"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
                                        <input
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            id="lastName"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Apellidos"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
                                        <input
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            id="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Nombre de usuario"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
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
                                    <div className="w-2/4">
                                        <input
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            id="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+34 Número de teléfono"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
                                        <input
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            id="city"
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Ciudad"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
                                        <input
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            id="address"
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Dirección de domicilio"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
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
                                <div className="mb-4 flex justify-center">
                                    <div className="w-2/4">
                                        <input
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirmar contraseña"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                                        type="submit"
                                    >
                                        Registrarse
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
