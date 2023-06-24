import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function ListAssignedDoctors({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [tokenValue, setTokenNew] = useState('')
  const [doctorEmail, setDoctorEmailNew] = useState('')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : tokenValue,
    "doctor_email"  : doctorEmail
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_assigned_doctors"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="List Assigned Doctors API test" 
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
        on_change={(e) => setTokenNew(e.target.value)}
      />
      <LabeledTextInputComponent
        id="doctor_email"
        label_text="doctor_email"
        input_type="text"
        required={true}
        on_change={(e) => setDoctorEmailNew(e.target.value)}
      />
    </TestPageTabLayout>
  )
}