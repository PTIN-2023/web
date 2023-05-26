import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";

export default function UpdateDronesTestComponent({apiEndpoint}) {
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : 'internal'
  })
  const [sumbitAndFetchOrderDrones, stringResponseOrderDrones] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/update_order_drones"
  )
  const [sumbitAndFetchOrderListOrdersDrones, stringResponseOrderListOrdersDrones] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_available_drones"
  )
  const [sumbitAndFetchOrderListDrones, stringResponseOrderListDrones] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_orders_to_send_drones"
  )

  // Define the HTML/React code
  return(<>
  <TestPageTabLayout 
      title="Update order drones API test" 
      onSubmit={sumbitAndFetchOrderDrones}
      stringRequest={stringRequest}
      stringResponse={stringResponseOrderDrones}
  >
  </TestPageTabLayout>
  <TestPageTabLayout 
      title="List available drone to send API test" 
      onSubmit={sumbitAndFetchOrderListOrdersDrones}
      stringRequest={stringRequest}
      stringResponse={stringResponseOrderListOrdersDrones}
  >
  </TestPageTabLayout>
  <TestPageTabLayout 
        title="List orders to send API test" 
        onSubmit={sumbitAndFetchOrderListDrones}
        stringRequest={stringRequest}
        stringResponse={stringResponseOrderListDrones}
    >
    </TestPageTabLayout>
  </>
  )
}