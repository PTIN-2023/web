import {useEffect, useState} from "react";
import {Label, TextInput, Button} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from '../../utils/getTextCurrentLocale'

export default function  RegisterUserTestComponent({apiEndpoint}) {
  // Cookies
  const [userGivenNameCookie, setUserGivenNameCookie] = useCookie('user_given_name')
  const [userRoleCookie, setUserRoleCookie] = useCookie('user_role')
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')

  // Form values
  const [userFullName, setUserFullName] = useState('');
  const [userGivenName, setUserGivenName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Call values
  const [request, setRequest] = useState('none');
  const [response, setResponse] = useState('none');

  // Update request accordingly with the form values
  useEffect(() => {setRequest({
    "user_full_name" : userFullName,
    "user_given_name" : userGivenName,
    "user_email" : userEmail,
    "user_phone" : userPhone,
    "user_city" : userCity,
    "user_address" : userAddress,
    "user_password" : userPassword
  })}, [userFullName, userGivenName, userEmail, userPhone, userCity, userAddress, userPassword])

  // Define the api call based on the state
  async function apiCall() {
      return fetch(apiEndpoint+"/api/register", {
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
        setUserGivenNameCookie(userFullName)
        setUserRoleCookie("patient")
        setUserTokenCookie(res.session_token)
      }
  };

  // Define the HTML/React code
  return(<>
  <h1 className="text-3xl font-bold mb-6 text-center">Register form</h1>
  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    <div>
    <div className="mb-2 block">
        <Label
        htmlFor="user_full_name"
        value={getTextCurrentLocale('user_full_name')}
        />
    </div>
    <TextInput
        id="user_full_name"
        type="text"
        required={true}
        onChange={(e) => setUserFullName(e.target.value)}
    />
    </div>
    <div>
    <div className="mb-2 block">
        <Label
        htmlFor="user_given_name"
        value={getTextCurrentLocale('user_given_name')}
        />
    </div>
    <TextInput
        id="user_given_name"
        type="text"
        required={true}
        onChange={(e) => setUserGivenName(e.target.value)}
    />
    </div>
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
        htmlFor="user_phone"
        value={getTextCurrentLocale('user_phone')}
        />
    </div>
    <TextInput
        id="user_phone"
        type="tel"
        required={false}
        onChange={(e) => setUserPhone(e.target.value)}
    />
    </div>
    <div>
    <div className="mb-2 block">
        <Label
        htmlFor="user_city"
        value={getTextCurrentLocale('user_city')}
        />
    </div>
    <TextInput
        id="user_city"
        type="text"
        required={true}
        onChange={(e) => setUserCity(e.target.value)}
    />
    </div>
    <div>
    <div className="mb-2 block">
        <Label
        htmlFor="user_address"
        value={getTextCurrentLocale('user_address')}
        />
    </div>
    <TextInput
        id="user_address"
        type="text"
        required={true}
        onChange={(e) => setUserAddress(e.target.value)}
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
  <br/>
  </>)
}