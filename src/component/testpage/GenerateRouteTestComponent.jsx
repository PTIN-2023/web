import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "./LabeledTextInput";

export default function GenerateRouteTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [actLatitude, setActLatitude] = useState('');
  const [actLongitude, setActLongitude] = useState('');
  const [endLatitude, setEndLatitude] = useState('');
  const [endLongitude, setEndLongitude] = useState('');
  
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "location_act" : {
        "latitude" : actLatitude,
        "longitude" : actLongitude,
    },
    "location_end" : {
        "latitude" : endLatitude,
        "longitude" : endLongitude,
    }
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/generate_map_route"
  )

  // Define the HTML/React code
  return(
  <TestPageTabLayout 
      title="Generate map route API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
  >
    <LabeledTextInputComponent
      id="actLatitude"
      label_text="actLatitude"
      input_type="text"
      required={true}
      on_change={(e) => setActLatitude(e.target.value)}
    />
    <LabeledTextInputComponent
      id="actLongitude"
      label_text="actLongitude"
      input_type="text"
      required={true}
      on_change={(e) => setActLongitude(e.target.value)}
    />
    <LabeledTextInputComponent
      id="endLatitude"
      label_text="endLatitude"
      input_type="text"
      required={true}
      on_change={(e) => setEndLatitude(e.target.value)}
    />
    <LabeledTextInputComponent
      id="endLongitude"
      label_text="endLongitude"
      input_type="text"
      required={true}
      on_change={(e) => setEndLongitude(e.target.value)}
    />
  </TestPageTabLayout>
  )
}