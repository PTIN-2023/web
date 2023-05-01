import React, { useState, useEffect } from 'react';
import 'flowbite/dist/flowbite.min.css';
import { Tab } from 'flowbite';
import Link from 'next/link';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import useCookie from "../hooks/useCookie";
import {useRouter} from 'next/router'
import * as env_config from "../utils/env_config"

export async function getServerSideProps() {
  const isLocal           = env_config.isLocal();
  const apiEndpoint       = String(          env_config.getApiEndpoint());
  const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
  const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
  const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
  const mapBoxToken       = String(          env_config.getTokenMapBox());
  const googleToken       = String(          env_config.getTokenGoogleSignIn());
  return {
    props: { 
      isLocal,
      apiEndpoint,
      locationName,
      locationLatitude,
      locationLongitude,
      mapBoxToken,
      googleToken
    }
  }
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [ user, setUser ] = useState(null);
  const [response, setResponse] = useState('');

  const [, setUserTokenCookie]  = useCookie('user_token', '')
  const [fullNameCookie, setFullNameCookie] = useCookie('user_full_name', '')
  const [givenNameCookie, setGivenNameCookie] = useCookie('user_given_name', '')
  const [userEmailCookie, setUserEmailCookie] = useCookie('user_email', '')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role', '')
  const [userAvatarCookie, setUserAvatarCookie] = useCookie('user_picture', '')
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setMessage("Login exitoso!");
        setShowErrorModal(false);
        router.push("/profile")
      } else {
        setMessage("Error en el inicio de sesión, verifica tus credenciales.");
        setShowErrorModal(true);
      }
    } catch (error) {
      setMessage("Error en la conexión con el servidor.");
    }
  };

  //google oauth handlers
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
                onClick={() => login()}
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
