import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function DoctorConfirmOrder({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [orderIdentifier, setOrderIdentifier] = useState('');
  const [approved, setApproved] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "order_identifier" : orderIdentifier,
    "approved" : approved
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/doctor_confirm_order"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Doctor confirm order API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
    >
      <LabeledTextInputComponent
        id="order_identifier"
        label_text="order_identifier"
        input_type="text"
        required={true}
        on_change={(e) => setOrderIdentifier(e.target.value)}
      />
      <LabeledTextInputComponent
        id="approved"
        label_text="approved"
        input_type="text"
        required={true}
        on_change={(e) => setApproved(e.target.value)}
      />
    </TestPageTabLayout>
  )
}