import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";

export default function BeehivesInfoTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
  })
  const [sumbitAndFetchGlobal, stringResponseGlobal] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/beehives_global"
  )
  const [sumbitAndFetchLocal, stringResponseLocal] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/beehives_local"
  )
  
  // Define the HTML/React code
  return(<>
    <TestPageTabLayout 
      title="Behives global info" 
      onSubmit={sumbitAndFetchGlobal}
      stringRequest={stringRequest}
      stringResponse={stringResponseGlobal}
    />
    <hr/><br/>
    <TestPageTabLayout 
      title="Behives local info" 
      onSubmit={sumbitAndFetchLocal}
      stringRequest={stringRequest}
      stringResponse={stringResponseLocal}
    />
  </>)
}