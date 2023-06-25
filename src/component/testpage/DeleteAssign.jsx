import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function DeleteAssign({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [tokenValue, setToken] = useState('')
  const [newDoctor, setDoctor] = useState('')
  const [newPatient, setPatient] = useState('')
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : tokenValue,
    "doctor_email"  : newDoctor,
    "patient_email" : newPatient
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/delete_assignations_doctor"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Delete Assign API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
    >
      <LabeledTextInputComponent
        id="session_token"
        label_text="session_token"
        input_type="text"
        required={true}
        on_change={(e) => setToken(e.target.value)}
      />
      <LabeledTextInputComponent
        id="doctor_email"
        label_text="doctor_email"
        input_type="text"
        required={true}
        on_change={(e) => setDoctor(e.target.value)}
      />
      <LabeledTextInputComponent
        id="patient_email"
        label_text="patient_email"
        input_type="text"
        required={true}
        on_change={(e) => setPatient(e.target.value)}
      />
    </TestPageTabLayout>
  )
}