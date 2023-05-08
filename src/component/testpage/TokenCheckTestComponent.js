import {useState, useEffect} from "react";
import {Button, Label, TextInput} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";
import getTextCurrentLocale from "../../utils/getTextCurrentLocale";

export default function LoginUserTestComponent({apiEndpoint}) {
  // Form values
  const [token, setToken] = useState('');

  // Call values
  const [request, setRequest] = useState('none');
  const [response, setResponse] = useState('none');

  // Update request accordingly with the form values
  useEffect(() => {setRequest({
    "token" : token,
  })}, [token])

  // Define the api call based on the state
  async function apiCall() {
    return fetch(apiEndpoint+"/api/checktoken", {
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
  };
  
  // Define the HTML/React code
  return(<>
    <h1 className="text-3xl font-bold mb-6 text-center">Login form</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
      <TextInput
          id="token_check"
          type="test"
          placeholder="token"
          required={true}
          onChange={(e) => setToken(e.target.value)}
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
    </>)
  }