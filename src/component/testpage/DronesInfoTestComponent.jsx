import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";

export default function DronesInfoTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
  })
  const [sumbitAndFetchFull, stringResponseFull] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/drones_full_info"
  )
  const [sumbitAndFetchPos, stringResponsePos] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/drones_pos_info"
  )
  
  // Define the HTML/React code
  return(<>
    <TestPageTabLayout 
      title="Drones full info" 
      onSubmit={sumbitAndFetchFull}
      stringRequest={stringRequest}
      stringResponse={stringResponseFull}
    />
    <hr/><br/>
    <TestPageTabLayout 
      title="Drones pos info" 
      onSubmit={sumbitAndFetchPos}
      stringRequest={stringRequest}
      stringResponse={stringResponsePos}
    />
  </>)
}