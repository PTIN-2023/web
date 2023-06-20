import hasExpectedFields from "../hasExpectedFields"

export function seedMirageDoctorsPrescriptions(server) {

}

export function defineMirageDoctorsPrescriptionsRoutes(server) {
    server.post("/api/doctor_create_prescription", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received doctor create prescription req with:" + request.requestBody)

        // Check payload
        const expectedFields = [
            "session_token",
            "user_full_name",
            "medicine_list",
            "duration",
            "notes"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        // Generate list
        const medicine_list = requestPayload.medicine_list.map((id) => {
            const med = schema.medicines.findBy({ medicine_identifier: id })
            return med.attrs
        })
    
        // Create order
        const prescr = {
            prescription_identifier: Math.random(),
            medicine_list: medicine_list,
            duration: requestPayload.duration,
            notes: requestPayload.notes,
            uses: requestPayload.uses,
            user_full_name: requestPayload.user_full_name
        }
    
        // Add to db
        schema.prescriptions.create(prescr)
        
        // Return
        return {
            result: 'ok'
        }
    })

    server.post("/api/get_patient_prescription_history", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received get patient prescription history req with:" + request.requestBody)

        // Check payload
        const expectedFields = [
            "session_token",
            "user_full_name",
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        const prescriptions = schema.prescriptions.findBy({user_full_name: requestPayload.user_full_name})
        
        // Return
        return {
            result: 'ok',
            prescriptions: prescriptions
        }
    })
}