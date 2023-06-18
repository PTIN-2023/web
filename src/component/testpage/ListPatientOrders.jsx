import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function ListPatientOrders({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [ordersPerPage, setOrdersPerPage] = useState('');
  const [page, setPage] = useState('');

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "orders_per_page" : ordersPerPage,
    "page" : page
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_patient_orders"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="List Patient Orders API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
    >
      <LabeledTextInputComponent
        id="orders_per_page"
        label_text="orders_per_page"
        input_type="text"
        required={true}
        on_change={(e) => setOrdersPerPage(e.target.value)}
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