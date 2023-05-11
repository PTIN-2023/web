import {useState} from "react";
import {Button} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";
import {useGoogleLogin, GoogleLogin} from '@react-oauth/google';
import fetchAndExtractBody from "../../utils/fetchAndExtractBody";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";

export default function GoogleOAuthTestcomponent({apiEndpoint}) {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')
  const [userPictureCookie, setUserPictureCookie] = useCookie('user_picture')

  // Form values
  const [ userGoogleToken, setUserGoogleToken ] = useState(null);

  // Request
  const stringRequest = usePrepareBodyRequest({
    "user_google_token" : userGoogleToken
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/google"
  )
  // Define the action of the sumbit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetchAndExtractBody(apiEndpoint+"/api/google", request);
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
  return(
    <TestPageTabLayout 
      title="Google OAuth API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{
        'user_given_name' : userGivenNameCookie,
        'user_role' : userRoleCookie,
        'user_token' : userTokenCookie,
        'user_picture' : userPictureCookie
      }}
    >
      <Button type="button" onClick={() => onClickGoogleLogin()} color="light">      
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        Google login
      </Button>
    </TestPageTabLayout>
  )

  // Define the HTML/React code
  return(<>
  <h1 className="text-3xl font-bold mb-6 text-center">Google login form</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

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