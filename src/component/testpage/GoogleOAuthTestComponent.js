import {useState, useEffect} from "react";
import {Button, Label, TextInput} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from "../../utils/getTextCurrentLocale";
import {useGoogleLogin, GoogleLogin} from '@react-oauth/google';

export default function GoogleOAuthTestcomponent({apiEndpoint}) {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')
  const [userPictureCookie, setUserPictureCookie] = useCookie('user_picture')

  // Form values
  const [ userGoogleToken, setUserGoogleToken ] = useState(null);

  // Call values
  const [request, setRequest] = useState('none');
  const [response, setResponse] = useState('none');

  // Update request accordingly with the form values
  useEffect(() => {setRequest({
    "user_google_token" : userGoogleToken,
  })}, [userGoogleToken])

  // Define the api call based on the state
  async function apiCall() {
    return fetch(apiEndpoint+"/api/google", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
    }).then(data => data.json())
  }

  // Define the action of the sumbit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await apiCall();
    setResponse(JSON.stringify(res))

    if (res.result === "ok") {
      setUserGivenNameCookie(res.user_given_name)
      setUserRoleCookie(res.user_role)
      setUserTokenCookie(res.user_token)
      setUserPictureCookie(res.user_picture)
    }
  };
  
  const onClickGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      console.log('Login Sucess:', codeResponse)
      setUserGoogleToken(codeResponse)
    },
    onError: (error) => {
      console.log('Login Failed:', error)
      setUserGoogleToken(null)
    },
  });

  // Define the HTML/React code
  return(<>
  <h1 className="text-3xl font-bold mb-6 text-center">Google login form</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Button type="button" onClick={() => onClickGoogleLogin()} color="light">      
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        Google login
      </Button>
      <Button type="submit">
        Submit
      </Button>
    </form>

  <h1 className="text-3xl font-bold mb-6 text-center">Request</h1>
  {JSON.stringify(request)}

  <br/>

  <h1 className="text-3xl font-bold mb-6 text-center">Response received</h1>
  {response}
  
  <br/>  
  
  <h1 className="text-3xl font-bold mb-6 text-center">Cookies values</h1>
    <p>user_given_name = {userGivenNameCookie}</p>
    <p>user_role = {userRoleCookie}</p>
    <p>user_token = {userTokenCookie}</p>  
    <p>user_picture = {userPictureCookie}</p>  
  <br/>
  </>)
}