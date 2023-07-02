import { useState } from 'react';
import { useRouter } from 'next/router';
import useCookie from './useCookie';

//Funciones y logica de Login
const useLogin = () => {
    // Cookies
    const [, setUserGivenNameCookie] = useCookie('user_given_name')
    const [, setUserRoleCookie] = useCookie('user_role')
    const [, setUserPictureCookie] = useCookie('user_picture')
    const [, setUserTokenCookie] = useCookie('user_token')
    const [, setUserEmailCookie] = useCookie('user_email')

    // Form values
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
                body: JSON.stringify({ 
                    user_email : email,
                    user_password : password 
                }),
            }).then(data => data.json());

            if (response.result === 'ok') {
                setUserGivenNameCookie(response.user_given_name)
                setUserRoleCookie(response.user_role)
                setUserPictureCookie(response.user_picture)
                setUserTokenCookie(response.user_token)
                setUserEmailCookie(res.user_email)

                setMessage('Login exitoso!');
                setShowErrorModal(false);

                if (response.user_role == "patient") router.push('/makeorder');
                else router.push('/profile');
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