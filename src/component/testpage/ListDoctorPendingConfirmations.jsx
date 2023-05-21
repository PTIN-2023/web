import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function ListDoctorPendingConfirmations({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [confirmationsPerPage, setConfirmationsPerPage] = useState('');
  const [page, setPage] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "confirmations_per_page" : confirmationsPerPage,
    "page" : page
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_doctor_pending_confirmations"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="List doctor pending confirmations API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
    >
      <LabeledTextInputComponent
        id="confirmations_per_page"
        label_text="confirmations_per_page"
        input_type="text"
        required={true}
        on_change={(e) => setConfirmationsPerPage(e.target.value)}
      />
      <LabeledTextInputComponent
        id="page"
        label_text="page"
        input_type="text"
        required={true}
        on_change={(e) => setPage(e.target.value)}
      />
    </TestPageTabLayout>
  )
}