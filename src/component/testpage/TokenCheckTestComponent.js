import {useState} from "react";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function tokenCheckTestComponent({apiEndpoint}) { 
  // Form values
  const [token, setToken] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "token" : token,
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/checktoken"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Cancel/Sumbit Order API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
    >
      <LabeledTextInputComponent
        id="token_check"
        label_text="token_check"
        input_type="text"
        required={true}
        on_change={(e) => setToken(e.target.value)}
      />
    </TestPageTabLayout>
  )
}