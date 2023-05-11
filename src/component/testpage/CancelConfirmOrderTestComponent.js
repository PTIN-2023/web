import {useState, useEffect} from "react";
import {Button, Label, TextInput, Select} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";

export default function CancelConfirmOrderTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [orderIdentifier, setOrderIdentifier] = useState('');
  const [action, setAction] = useState('cancel');

  // Call values
  const [request, setRequest] = useState('none');
  const [response, setResponse] = useState('none');

  // Update request accordingly with the form values
  useEffect(() => {setRequest({
    "session_token" : userTokenCookie,
    "order_identifier" : orderIdentifier
  })}, [userTokenCookie, orderIdentifier])

  // Define the api call based on the state
  async function apiCall(url) {
    return fetch(url, {
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

    const res = await apiCall(apiEndpoint+"/api/"+action+"_patient_order");
    setResponse(JSON.stringify(res))
  };
  
  // Define the HTML/React code
  return(<>
    <h1 className="text-3xl font-bold mb-6 text-center">Cancel Order API test</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="order_identifier"
          value="order_identifier"
          />
      </div>
      <TextInput
          id="order_identifier"
          type="text"
          required={true}
          onChange={(e) => setOrderIdentifier(e.target.value)}
      />
      </div>
      <div>
      <div className="mb-2 block">
        <Label
          htmlFor="action"
          value={action}
        />
      </div>
      <Select 
        id="action" 
        required={true}
        onChange={(e) => setAction(e.target.value)}
      >
        <option>cancel</option>
        <option>confirm</option>
      </Select>
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
      <p>user_token = {userTokenCookie}</p>  
    <br/>
    </>)
  }