import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";

export default function UpdateTestComponent({apiEndpoint}) {
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : 'internal'
  })
  const [sumbitAndFetchOrderCars, stringResponseOrderCars] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/update_order_cars"
  )
  const [sumbitAndFetchOrderListCars, stringResponseOrderListCars] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_orders_to_send_cars"
  )
  const [sumbitAndFetchOrderListOrdersCars, stringResponseOrderListOrdersCars] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/list_available_cars"
  )
  const [sumbitAndFetchOrderDrones, stringResponseOrderDrones] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/update_order_drones"
  )

  // Define the HTML/React code
  return(<>
    <TestPageTabLayout 
        title="List orders to send API test" 
        onSubmit={sumbitAndFetchOrderListCars}
        stringRequest={stringRequest}
        stringResponse={stringResponseOrderListCars}
    >
    </TestPageTabLayout>
  <TestPageTabLayout 
      title="List avaliable cars to send API test" 
      onSubmit={sumbitAndFetchOrderListOrdersCars}
      stringRequest={stringRequest}
      stringResponse={stringResponseOrderListOrdersCars}
  >
  </TestPageTabLayout>
  <TestPageTabLayout 
      title="Update order cars API test" 
      onSubmit={sumbitAndFetchOrderCars}
      stringRequest={stringRequest}
      stringResponse={stringResponseOrderCars}
  >
  </TestPageTabLayout>
  <TestPageTabLayout 
      title="Update order drones API test" 
      onSubmit={sumbitAndFetchOrderDrones}
      stringRequest={stringRequest}
      stringResponse={stringResponseOrderDrones}
  >
  </TestPageTabLayout>
  </>
  )
}