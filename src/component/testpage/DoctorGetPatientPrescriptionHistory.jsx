import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function DoctorGetPatientPrescriptionHistory({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [userFullName, setUserFullName] = useState('John Doe')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "user_full_name" : userFullName
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/get_patient_prescription_history"
  )

  // Define the HTML/React code
  return(
  <TestPageTabLayout 
      title="Make order API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
  >
    <LabeledTextInputComponent
      id="userFullName"
      label_text="userFullName"
      input_type="text"
      required={true}
      on_change={(e) => setUserFullName(e.target.value)}
    />
  </TestPageTabLayout>
  )
}