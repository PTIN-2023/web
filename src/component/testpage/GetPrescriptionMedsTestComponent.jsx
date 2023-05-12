import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function GetPrecriptionMedsTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [prescriptionIdentifier, setPrescriptionIdentifier] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie, 
    "prescription_identifier" : prescriptionIdentifier
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/get_prescription_meds"
  )
  
  // Define the HTML/React code
  return(
  <TestPageTabLayout 
    title="Get prescription meds API test" 
    onSubmit={sumbitAndFetch}
    stringRequest={stringRequest}
    stringResponse={stringResponse}
    cookiesToShow={{'user_token' : userTokenCookie}}
  >
    <LabeledTextInputComponent
      id="prescription_identifier"
      label_text="prescription_identifier"
      input_type="text"
      required={true}
      on_change={(e) => setPrescriptionIdentifier(e.target.value)}
    />
  </TestPageTabLayout>
  )
}