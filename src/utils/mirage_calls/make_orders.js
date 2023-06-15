import hasExpectedFields from '../hasExpectedFields'

export function seedMirageMakeOrders(server) {
  // Create medicines
  server.create("medicine", {
    medicine_identifier: '0fghdfh',
    medicine_image_url: 'https://picsum.photos/200',
    medicine_name: 'Ibuprofeno',
    excipient: 'Sorbitol (E-420)',
    pvp: 4,
    contents: '30 comprimidos',
    prescription_needed: false,
    form: 'pill',
    type_of_adminstration: 'oral'
  })
  server.create("medicine", {
    medicine_identifier: '1fgdhgfd',
    medicine_image_url: 'https://picsum.photos/200',
    medicine_name: 'medicine1',
    excipient: 'excipient1',
    pvp: '1',
    contents: 'contents1',
    prescription_needed: true,
    form: 'cream',
    type_of_adminstration: 'topical'
  })
  server.create("medicine", {
    medicine_identifier: '2fdghj',
    medicine_image_url: 'https://picsum.photos/200',
    medicine_name: 'medicine2',
    excipient: 'excipient2',
    pvp: '2',
    contents: 'contents2',
    prescription_needed: true,
    form: 'powder',
    type_of_adminstration: 'inhalation'
  })
  server.create("medicine", {
    medicine_identifier: '3hgffgdh',
    medicine_image_url: 'https://picsum.photos/200',
    medicine_name: 'medicine3',
    excipient: 'excipient3',
    pvp: '3',
    contents: 'contents3',
    prescription_needed: false,
    form: 'liquid',
    type_of_adminstration: 'ophthalmic'
  })

  // Create prescriptions
  server.create("prescription", {
    prescription_identifier : '32',
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
    ]
  })
}

export function defineMakeOrdersRoutes(server) {
    server.post("/api/num_pages_available_medicines", (schema, request) => {
      console.log("Received list available medicines req with:" + request.requestBody)
      const requestPayload = JSON.parse(request.requestBody)
      const filter = requestPayload.filter

      const medicinesNum = schema.medicines.all().models.length
      
      return {
          result: 'ok',
          number_of_pages : medicinesNum/filter.meds_per_page
      }
    })

    server.post("/api/list_available_medicines", (schema, request) => {
      console.log("Received list available medicines req with:" + request.requestBody)
      const requestPayload = JSON.parse(request.requestBody)
      const filter = requestPayload.filter

      const start = filter.meds_per_page*(filter.page-1)
      const end = start+filter.meds_per_page
      const medicines = schema.medicines.all().models.slice(start, end)

      return {
          result: 'ok',
          medicines
      }
    })

    server.post("/api/has_prescription", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received has prescription req with:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
        "medicine_identifier"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      // Check if medicine exists
      const medicine = schema.medicines.findBy({ medicine_identifier : requestPayload.medicine_identifier })
      if (!medicine) {
        return {result : 'error_med'}
      }

      // Return
      return {
        result: 'ok',
        prescription_needed : medicine.prescription_needed,
        prescription_given : (medicine.medicine_identifier === '2')
      }
    })

    server.post("/api/make_order", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received make order req with:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
        "medicine_identifiers"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      // Generate list
      const medicine_list = requestPayload.medicine_identifiers.map((id) => {
        const med = schema.medicines.findBy({medicine_identifier : id})
        return med.attrs
      })

      // Create order
      const order = {
        order_identifier : Math.random(),
        medicine_list : medicine_list,
        date : new Date().toISOString().split('T')[0],
        state : 'ordered'
      }

      // Add to db
      schema.orders.create(order)

      // Return
      return {
        result: 'ok',
        order_identifier : order.order_identifier
      }
    })

    server.post("/api/create_payment", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received make order req with:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
        "order_identifier",
        "amount"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      // TODO: move paypal create order logic here

      // Return
      return {
        result: 'ok',
        url : 'http://example.com'
      }
    })

    server.post("/api/get_prescription_meds", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received get prescription meds prescription req with:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
        "prescription_identifier"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      // Try to get the prescription
      const prescription = schema.prescriptions.findBy({ prescription_identifier : requestPayload.prescription_identifier })
      if (!prescription) {
        return {result : 'error_prescription'}
      }

      // Return
      return {
        result: 'ok',
        medicine_list : prescription.medicine_list
      }
    })
}