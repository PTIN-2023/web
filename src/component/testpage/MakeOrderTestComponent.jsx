import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function MakeOrderTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [medicineIdentifiers, setMedicineIdentifiers] = useState(['0', '1', '2', '3']);
  
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "medicine_identifiers" : medicineIdentifiers
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/make_order"
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
      id="medicine_identifiers"
      label_text="medicine_identifiers"
      input_type="text"
      required={true}
      on_change={(e) => setMedicineIdentifiers(e.target.value.split(','))}
      value={medicineIdentifiers}
    />
  </TestPageTabLayout>
  )
}