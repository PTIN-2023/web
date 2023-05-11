import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function HasPrescriptionTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [medicineIdentifier, setMedicineIdentifier] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "medicine_identifier" : medicineIdentifier
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/has_prescription"
  )

  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Check prescription API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
    >
      <LabeledTextInputComponent
        id="medicine_identifier"
        label_text="medicine_identifier"
        input_type="text"
        required={true}
        on_change={(e) => setMedicineIdentifier(e.target.value)}
      />
    </TestPageTabLayout>
  )
}