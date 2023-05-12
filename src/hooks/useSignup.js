import { useState } from 'react';
import { useRouter } from 'next/router';
import useCookie from '../hooks/useCookie'

/* "user_full_name", 
"user_given_name", 
"user_email", 
"user_phone",
"user_city", 
"user_address", 
"user_password" */

//Funciones y logica de SignUp
export default function useSignup() {
    // Cookies
    const [, setUserGivenNameCookie] = useCookie('user_given_name')
    const [, setUserRoleCookie] = useCookie('user_role')
    const [, setUserTokenCookie] = useCookie('user_token')

    // Form values
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    // Handlers
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            console.log("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_full_name : (formData.name + ' ' + formData.lastName),
                    user_given_name : (formData.username),
                    user_email : (formData.email),
                    user_phone : (formData.phone),
                    user_city : (formData.city),
                    user_address : (formData.address),
                    user_password : (formData.password)
                }),
            }).then(data => data.json())

            if (!response || response.result != 'ok') {
                throw new Error('Error al registrarse. Por favor, inténtalo de nuevo.');
            }

            setUserGivenNameCookie(formData.username)
            setUserRoleCookie('patient')
            setUserTokenCookie(response.session_token)

            console.log('Registrado con éxito');
            router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    return { formData, handleChange, handleSubmit };
};
