import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";

export default function GeneralStorePosTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/general_storage_pos"
  )
  
  // Define the HTML/React code
  return(<>
    <TestPageTabLayout 
      title="Storage location info" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
    />
  </>)
}