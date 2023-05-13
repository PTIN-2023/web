import hasExpectedFields from "../hasExpectedFields"

export function seedMirageDoctorsNotifications(server) {
}

export function defineMirageDoctorsNotificationsRoutes(server) {
    server.post("/api/list_doctor_pending_confirmations", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received list pending notifications orders req with:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
        "confirmations_per_page",
        "page"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      const orders = schema.orders.where((order) => order.state === 'awaiting_confirmation').models.map((order) => {
        return {
            order_identifier : order.order_identifier,
            date : order.date,
            patient_fullname : "John Doe",
            medicine_list : order.medicine_list
        }
      })
      
      // Return
      return {
        result: 'ok',
        orders : orders
      }
    })

    server.post("/api/list_doctor_approved_confirmations", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received list pending notifications orders req with:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
        "confirmations_per_page",
        "page"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      const orders = schema.orders.where((order) => order.state != 'awaiting_confirmation').models.map((order) => {
        const stateToApproved = (state) => {
            if (state === 'canceled')
                return 'canceled'
            if (state === 'denied')
                return 'no'
            return 'yes'
        }

        return {
            order_identifier : order.order_identifier,
            date : order.date,
            patient_fullname : "John Doe",
            medicine_list : order.medicine_list,
            approved : stateToApproved(order.state)
        }
      })
      
      // Return
      return {
        result: 'ok',
        orders : orders
      }
    })


    server.post("/api/doctor_confirm_order", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received list pending notifications orders req with:" + request.requestBody)
  
        // Check payload
        const expectedFields = [
          "session_token",
          "order_identifier",
          "approved"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk || !['true', 'false'].includes(requestPayload.approved)) {
          return {result : 'error_fields'}
        }
  
        // Try get order
        const order = schema.orders.findBy({order_identifier : requestPayload.order_identifier})
        if(!order){
            return {result : 'not_found'}
        }
        
        if(order.state != 'awaiting_confirmation'){
            return {result : 'not awaiting'}
        }

        // Update order
        schema.db.orders.update(
            order.id,
            {
              state : {
                result : requestPayload.approved=='true' ? 'ordered' : 'denied'
              }
            }
        )
        
        // Return
        return {
          result: 'ok'
        }
      })

}