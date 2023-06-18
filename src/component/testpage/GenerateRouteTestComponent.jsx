import {useState} from "react";
import React from "react";
import useCookie from "../../hooks/useCookie";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function GenerateRouteTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token', 'undefined')

  // Form values
  const [actLatitude, setActLatitude] = useState('41.2209492');
  const [actLongitude, setActLongitude] = useState('1.7298172');
  const [endLatitude, setEndLatitude] = useState('41.2280427');
  const [endLongitude, setEndLongitude] = useState('1.7350207');
  
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
  >
    <LabeledTextInputComponent
      id="actLatitude"
      label_text="actLatitude"
      input_type="text"
      required={true}
      on_change={(e) => setActLatitude(e.target.value)}
      value = {actLatitude}
    />
    <LabeledTextInputComponent
      id="actLongitude"
      label_text="actLongitude"
      input_type="text"
      required={true}
      on_change={(e) => setActLongitude(e.target.value)}
      value = {actLongitude}
    />
    <LabeledTextInputComponent
      id="endLatitude"
      label_text="endLatitude"
      input_type="text"
      required={true}
      on_change={(e) => setEndLatitude(e.target.value)}
      value = {endLatitude}
    />
    <LabeledTextInputComponent
      id="endLongitude"
      label_text="endLongitude"
      input_type="text"
      required={true}
      on_change={(e) => setEndLongitude(e.target.value)}
      value = {endLongitude}
    />
  </TestPageTabLayout>
  )
}