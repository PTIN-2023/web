import React from 'react';
import useLogin from '../hooks/useLogin';
import ErrorModal from '../component/ErrorModal';

//Algunas funciones de control de patrones de inputs + Form de inputs

const LoginForm = () => {
    const {
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
    } = useLogin();

    const validateEmail = (value) => {
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return re.test(String(value).toLowerCase());
    };

    const validatePassword = (value) => {
        const re = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        return re.test(String(value));
    };
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value); // Deja que el usuario escriba en el campo de entrada de correo electrónico
    
        if (validateEmail(value)) {
            setEmailError(""); // Limpia el error si el valor es válido
        } else {
            setEmailError("Por favor, introduce un correo electrónico válido.");
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (validatePassword(value)) {
            setPassword(value);
        }
    }


    return (
        <>
            {showErrorModal && (
                <ErrorModal
                    message={message}
                    onClose={() => {
                        setShowErrorModal(false);
                    }}
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex justify-center">
                    <div className="w-1/2">
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Correo electrónico"
                            required
                        />
                        {emailError && (
                            <div className="mt-2 text-red-600 text-sm">
                                {emailError}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-4 flex justify-center">
                    <div className="w-1/2">
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
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
                </div>
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
        </>
    );
};

export default LoginForm;
