import { useState } from 'react';
import { useRouter } from 'next/router';

//Funciones y logica de Login
const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [emailError, setEmailError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setMessage('Login exitoso!');
                setShowErrorModal(false);
                router.push('/profile');
            } else {
                setMessage('Error en el inicio de sesión, verifica tus credenciales.');
                setShowErrorModal(true);
            }
        } catch (error) {
            setMessage('Error en la conexión con el servidor.');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        rememberMe,
        setRememberMe,
        message,
        showErrorModal,
        setShowErrorModal,
        handleSubmit,
        emailError,
        setEmailError,
    };
};

export default useLogin;