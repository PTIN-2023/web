import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";


export default function GetRouteTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [idRoute, setIdRoute] = useState('0');
  const [coordinates, setCoordinates] = useState([[0,0], [0,1], [0,2]]);
  
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "id_route" : idRoute
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/get_route"
  )

  // Define the HTML/React code
  return(
  <TestPageTabLayout 
      title="Store route API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
  >
    <LabeledTextInputComponent
      id="id_route"
      label_text="id_route"
      input_type="text"
      required={true}
      on_change={(e) => setIdRoute(e.target.value)}
      value={idRoute}
    />
  </TestPageTabLayout>
  )
}