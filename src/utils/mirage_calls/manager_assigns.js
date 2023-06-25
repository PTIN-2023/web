import hasExpectedFields from '../hasExpectedFields'

export function seedMiragePatientsList(server) {
  for(i = 0; i < 20; i++){
    server.create("patient", {
        user_full_name: 'Pablo Alcaraz',
        user_email: 'doctor@doctor.com',
        user_phone: '666666666',
        user_city: 'Barcelona'
      }
    )
  }
}

export function defineMiragePatientsListRoutes(server) {
    server.post("/api/manager_list_doctors", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received list patient orders req with:" + request.requestBody)
      let total_patients = []

      for(let i = 0; i < 20; i++){
        total_patients.push({
            user_full_name: 'Pablo Alcaraz',
            user_email: 'doctor@doctor.com',
            user_phone: '666666666',
            user_city: 'Barcelona'
          })
      }
      total_patients.push({
        user_full_name: 'Pablo Alcaraz',
        user_email: 'doctoasdasdr@doctor.com',
        user_phone: '666666666',
        user_city: 'Barcelona'
      })
      // Check payload
      const expectedFields = [
        "session_token",
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      // Return
      return {
        result: 'ok',
        patients : total_patients
      }
    })
}
