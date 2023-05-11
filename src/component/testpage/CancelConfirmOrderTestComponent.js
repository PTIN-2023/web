import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";
import LabeledSelect from "./LabeledSelect";

export default function CancelConfirmOrderTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [orderIdentifier, setOrderIdentifier] = useState('');
  const [action, setAction] = useState('cancel');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "order_identifier" : orderIdentifier
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/"+action+"_patient_order"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Cancel/Sumbit Order API test" 
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
      <LabeledSelect
        id="action2"
        label_text={action}
        required={true}
        options={['cancel', 'confirm']}
        on_change={(e) => setAction(e.target.value)}
      />
    </TestPageTabLayout>
  )
}