import hasExpectedFields from '../hasExpectedFields'

export function seedMirageListOrders(server) {
  server.create("medicine", {
    medicine_identifier: '0',
    medicine_image_url: '',
    medicine_name: 'Ibuprofeno',
    excipient: 'Sorbitol (E-420)',
    pvp: 4,
    contents: '30 comprimidos',
    prescription_needed: false,
    form: 'pill',
    type_of_adminstration: 'oral'
  })
  server.create("medicine", {
    medicine_identifier: '1',
    medicine_image_url: '',
    medicine_name: 'medicine1',
    excipient: 'excipient1',
    pvp: '1',
    contents: 'contents1',
    prescription_needed: true,
    form: 'cream',
    type_of_adminstration: 'topical'
  })
  server.create("medicine", {
    medicine_identifier: '2',
    medicine_image_url: '',
    medicine_name: 'medicine2',
    excipient: 'excipient2',
    pvp: '2',
    contents: 'contents2',
    prescription_needed: true,
    form: 'powder',
    type_of_adminstration: 'inhalation'
  })
  server.create("medicine", {
    medicine_identifier: '3',
    medicine_image_url: '',
    medicine_name: 'medicine3',
    excipient: 'excipient3',
    pvp: '3',
    contents: 'contents3',
    prescription_needed: false,
    form: 'liquid',
    type_of_adminstration: 'ophthalmic'
  })
}

export function defineListOrdersRoutes(server) {
    server.post("/api/list_available_medicines", (schema, request) => {
      console.log("Received list available medicines req with:" + request.requestBody)

      const medicines = schema.medicines.all()

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

      return {
        result: 'ok',
        prescription_needed : medicine.prescription_needed,
        prescription_given : (medicine.medicine_identifier === '2')
      }
    })
}