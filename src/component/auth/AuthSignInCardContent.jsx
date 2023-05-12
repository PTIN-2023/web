import React, {useState, useEffect} from 'react';
import useLogin from '../../hooks/useLogin';
import ErrorModal from '../ErrorModal';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import useCookie from "../../hooks/useCookie";
import {useRouter} from 'next/router'

export default function AuthSignInCardContent({setPage}) {
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

  //google oauth handlers

  const [ user, setUser ] = useState(null);
  const [response, setResponse] = useState('');

  const [, setUserTokenCookie]  = useCookie('user_token', '')
  const [fullNameCookie, setFullNameCookie] = useCookie('user_full_name', '')
  const [givenNameCookie, setGivenNameCookie] = useCookie('user_given_name', '')
  const [userEmailCookie, setUserEmailCookie] = useCookie('user_email', '')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role', '')
  const [userAvatarCookie, setUserAvatarCookie] = useCookie('user_picture', '')
  const router = useRouter()

  async function googleCookiesHander(apires){
      console.log("Guardando galletas...")
      await setFullNameCookie(apires.fullName);
      const auxName = apires.fullName.split(" ");
      setGivenNameCookie(auxName[0]);
      setUserRoleCookie(apires.role);
      setUserEmailCookie(apires.email);
      setUserTokenCookie(apires.session_token);
      setUserAvatarCookie(apires.picture);

  }
  useEffect(
      () => {
          if (user) {
          fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          .then((res) => res.json())
          .then(async (data) => {
              const apires = await apiCall(data);
              console.log(apires)
              await googleCookiesHander(apires);
              router.push('/profile')             

              })
          .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  async function apiCall(data) {
      return await fetch("http://localhost:3000/api/google", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: {
          email: data.email,
          name: data.name,
          picture: data.picture
      }
      }).then(data => data.json())
  }

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
          setUser(codeResponse),
          console.log(user)          
      },
      onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
      googleLogout();
  };    


  return (<>
    {showErrorModal && (
        <ErrorModal
            message={message}
            onClose={() => {
                setShowErrorModal(false);
            }}
        />
    )}
    <div className="pt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>
    </div>
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
          onClick={() => login()}
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
  </>)
}