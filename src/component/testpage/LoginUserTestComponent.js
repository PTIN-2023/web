import {useState, useEffect} from "react";
import {Button, Label, TextInput} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from "../../utils/getTextCurrentLocale";

export default function LoginUserTestComponent({apiEndpoint}) {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')
  const [userPictureCookie, setUserPictureCookie] = useCookie('user_picture')

  // Form values
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Call values
  const [request, setRequest] = useState('none');
  const [response, setResponse] = useState('none');

  // Update request accordingly with the form values
  useEffect(() => {setRequest({
    "user_email" : userEmail,
    "user_password" : userPassword
  })}, [userEmail, userPassword])


  // Define the api call based on the state
  async function apiCall() {
    return fetch(apiEndpoint+"/api/login", {
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
  
  // Define the HTML/React code
  return(<>
    <h1 className="text-3xl font-bold mb-6 text-center">Login form</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="user_email"
          value={getTextCurrentLocale('user_email')}
          />
      </div>
      <TextInput
          id="user_email"
          type="email"
          placeholder="name@flowbite.com"
          required={true}
          onChange={(e) => setUserEmail(e.target.value)}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="user_password"
          value={getTextCurrentLocale('user_password')}
          />
      </div>
      <TextInput
          id="user_password"
          type="password"
          required={true}
          onChange={(e) => setUserPassword(e.target.value)}
      />
      </div>
      <Button type="submit">
      Submit
      </Button>
    </form>
    <br/>
  
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