import {useState, useEffect} from "react";
import {Button, Label, TextInput} from 'flowbite-react'
import React from "react";
import useCookie from "../../hooks/useCookie";

export default function ListMedicinesTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, setUserTokenCookie] = useCookie('user_token')

  // Form values
  const [medsPerPage, setMedsPerPage] = useState('');
  const [page, setPage] = useState('');
  const [medName, setMedName] = useState('');
  const [pvpMin, setPvpMin] = useState('');
  const [pvpMax, setPvpMax] = useState('');
  const [prescriptionNeeded, setPrescriptionNeeded] = useState([true, false]);
  const [medForm, setMedForm] = useState(['pill', 'cream', 'powder', 'liquid']);
  const [typeOfAdminst, setTypeOfAdminst] = useState(['oral', 'topical', 'inhalation', 'ophthalmic']);
  
  // Call values
  const [request, setRequest] = useState('none');
  const [response, setResponse] = useState('none');

  // Update request accordingly with the form values
  useEffect(() => {setRequest({
    "session_token" : userTokenCookie,
    "filter" : {
        "meds_per_page" : medsPerPage,
        "page" : page,
        "med_name" : medName,
        "pvp_min" : pvpMin,
        "pvp_max" : pvpMax,
        "prescription_needed" : prescriptionNeeded,
        "form" : medForm,
        "type_of_administration" : typeOfAdminst
    }
  })}, [userTokenCookie, medsPerPage, page, medName, pvpMin, pvpMax, prescriptionNeeded, medForm, typeOfAdminst])

  // Define the api call based on the state
  async function apiCall() {
    return fetch(apiEndpoint+"/api/list_available_medicines", {
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
    <h1 className="text-3xl font-bold mb-6 text-center">List medicines test</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="meds_per_page"
          value={'Meds per page'}
          />
      </div>
      <TextInput
          id="meds_per_page"
          type="text"
          required={true}
          value={JSON.stringify(medsPerPage)}
          onChange={(e) => setMedsPerPage((e.target.value))}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="page"
          value={'Page'}
          />
      </div>
      <TextInput
          id="page"
          type="text"
          required={true}
          value={JSON.stringify(page)}
          onChange={(e) => setPage((e.target.value))}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="med_name"
          value={'med_name'}
          />
      </div>
      <TextInput
          id="page"
          type="text"
          required={true}
          value={JSON.stringify(medName)}
          onChange={(e) => setMedName((e.target.value))}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="pvp_min"
          value={'pvp_min'}
          />
      </div>
      <TextInput
          id="page"
          type="text"
          required={true}
          value={JSON.stringify(pvpMin)}
          onChange={(e) => setPvpMin((e.target.value))}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="pvp_max"
          value={'pvp_max'}
          />
      </div>
      <TextInput
          id="page"
          type="text"
          required={true}
          value={JSON.stringify(pvpMax)}
          onChange={(e) => setPvpMax((e.target.value))}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="prescription_needed"
          value={'prescription_needed'}
          />
      </div>
      <TextInput
          id="page"
          type="text"
          required={true}
          value={JSON.stringify(prescriptionNeeded)}
          onChange={(e) => setPrescriptionNeeded(JSON.parse(e.target.value))}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="form"
          value={'form'}
          />
      </div>
      <TextInput
          id="page"
          type="text"
          required={true}
          value={JSON.stringify(medForm)}
          onChange={(e) => setMedForm(JSON.parse(e.target.value))}
      />
      </div>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="type_of_administration"
          value={'type_of_administration'}
          />
      </div>
      <TextInput
          id="page"
          type="type_of_administration"
          required={true}
          value={JSON.stringify(typeOfAdminst)}
          onChange={(e) => setTypeOfAdminst(JSON.parse(e.target.value))}
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
      <p>user_token = {userTokenCookie}</p>  
    <br/>
    </>)
}