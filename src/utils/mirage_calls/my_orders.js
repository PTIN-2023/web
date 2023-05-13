import hasExpectedFields from '../hasExpectedFields'

export function seedMirageMyOrders(server) {
    const states = [
        {num: 0, name: 'awaiting_confirmation'},
        {num: 1, name: 'ordered'},
        {num: 2, name: 'car_sent'},
        {num: 3, name: 'drone_sent'},
        {num: 4, name: 'delivered_waiting'},
        {num: 5, name: 'delivered'},
        {num: 6, name: 'denied'},
        {num: 7, name: 'canceled'}
    ]

    states.forEach(state => {
        server.create("order", {
            order_identifier : state.num,
            medicine_list : [
                {
                  medicine_identifier: '1',
                  medicine_image_url: 'https://picsum.photos/200',
                  medicine_name: 'medicine1',
                  excipient: 'excipient1',
                  pvp: '1',
                  contents: 'contents1',
                  prescription_needed: true,
                  form: 'cream',
                  type_of_adminstration: 'topical'
                },
                {
                  medicine_identifier: '0',
                  medicine_image_url: 'https://picsum.photos/200',
                  medicine_name: 'Ibuprofeno',
                  excipient: 'Sorbitol (E-420)',
                  pvp: 4,
                  contents: '30 comprimidos',
                  prescription_needed: false,
                  form: 'pill',
                  type_of_adminstration: 'oral'
                }
            ],
            date : '2023-01-0' + state.num,
            state : state.name
        })
    })
}

export function defineMirageMyOrdersRoutes(server) {
    server.post("/api/list_patient_orders", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received list patient orders req with:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
        "orders_per_page",
        "page"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      const orders = schema.orders.all().models

      // Return
      return {
        result: 'ok',
        orders : orders
      }
    })

    server.post("/api/cancel_patient_order", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received cancel patient order eq with:" + request.requestBody)
  
        // Check payload
        const expectedFields = [
          "session_token",
          "order_identifier"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
          return {result : 'error_fields'}
        }

        // Check valid order
        const order = schema.orders.findBy({order_identifier : requestPayload.order_identifier})
        if(!order) {
          return {result : 'error_order'}
        }

        // Check cancelable order
        console.log(order)
        if(!['awaiting_confirmation', 'ordered'].includes(order.state)) {
          return {result : 'error_non_cancelable'}
        }

        // Cancel order
        schema.db.orders.update(
          order.id,
          {
            state: 'canceled'
          }
        )

        // Return
        return {
          result: 'ok'
        }
    })


    server.post("/api/confirm_patient_order", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received confirm patient order req with:" + request.requestBody)
  
        // Check payload
        const expectedFields = [
          "session_token",
          "order_identifier"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
          return {result : 'error_fields'}
        }

        // Check valid order
        const order = schema.orders.findBy({order_identifier : requestPayload.order_identifier})
        if(!order) {
          return {result : 'error_order'}
        }

        // Check confirmable order
        if(order.state != 'delivered_waiting') {
          return {result : 'error_non_confirmable'}
        }

        // Confirm order
        schema.db.orders.update(
          order.id,
          {
            state: 'delivered'
          }
        )

        // Return
        return {
          result: 'ok'
        }
    })
}
