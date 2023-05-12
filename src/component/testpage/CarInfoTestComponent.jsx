import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";

export default function CarInfoTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
  })
  const [sumbitAndFetchFull, stringResponseFull] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/cars_full_info"
  )
  const [sumbitAndFetchPos, stringResponsePos] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/cars_pos_info"
  )
  
  // Define the HTML/React code
  return(<>
    <TestPageTabLayout 
      title="Cars full info" 
      onSubmit={sumbitAndFetchFull}
      stringRequest={stringRequest}
      stringResponse={stringResponseFull}
    />
    <hr/><br/>
    <TestPageTabLayout 
      title="Cars pos info" 
      onSubmit={sumbitAndFetchPos}
      stringRequest={stringRequest}
      stringResponse={stringResponsePos}
    />
  </>)
}