import React, { useState } from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import useCookie from "../../hooks/useCookie";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function UpdateDronesTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token', 'undefined')

  // Form vals
  const [id_beehive, setBeehiveId] = useState('0')

  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : userTokenCookie,
    "id_beehive" : id_beehive
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
    <LabeledTextInputComponent
        id="id_beehive"
        label_text="id_beehive"
        input_type="text"
        required={true}
        on_change={(e) => setBeehiveId(e.target.value)}
    />
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