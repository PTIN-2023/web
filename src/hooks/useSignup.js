import { useState } from 'react';
import { useRouter } from 'next/router';

//Funciones y logica de SignUp
const useSignup = () => {
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
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

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
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al registrarse. Por favor, inténtalo de nuevo.');
            }

            console.log('Registrado con éxito');
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return { formData, handleChange, handleSubmit };
};

export default useSignup;
