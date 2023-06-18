import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function CreatePaymentTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [amount, setAmount] = useState(5);
  const [order, setOrderIdentifier] = useState(5);
  
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "order_identifier" : order,
    "amount" : amount,
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/create_payment"
  )

  // Define the HTML/React code
  return(
  <TestPageTabLayout 
      title="Create payment API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
  >
    <LabeledTextInputComponent
      id="amount"
      label_text="amount"
      input_type="text"
      required={true}
      on_change={(e) => setAmount(e.target.value)}
    />
    <LabeledTextInputComponent
      id="order_identifier"
      label_text="order_identifier"
      input_type="text"
      required={true}
      on_change={(e) => setOrderIdentifier(e.target.value)}
    />
  </TestPageTabLayout>
  )
}