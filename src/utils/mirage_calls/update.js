import hasExpectedFields from '../hasExpectedFields'
import update_order_cars from '../../lib/update_order_cars'

export function seedMirageUpdate(server) {

}

export function defineMirageUpdateRoutes(server) {
    server.post("/api/list_orders_to_send_cars", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received list order to send car req with:" + request.requestBody)

        // Check payload
        const expectedFields = [
            "session_token"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        // Get orders
        const orders = schema.orders.where((order) => order.state === 'ordered').models.map((order) => {
            return {
                order_identifier : order.order_identifier,
                date : order.date,
                patient_fullname : "John Doe",
                medicine_list : order.medicine_list,
                beehive_coords_destiny : schema.beehives.findBy({id_beehive: (order.order_identifier % 2 == 0 ? 1 : 2)})
            }
        })

        // Return
        return { 
            result : 'ok',
            orders: orders
        }
    })

    server.post("/api/list_available_cars", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received list available cars req with:" + request.requestBody)

        // Check payload
        const expectedFields = [
            "session_token"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        // Get cars
        const CAR_IDLE_STATUS = 4
        const cars = schema.cars.where((car) => car.status == CAR_IDLE_STATUS).models.map((car) => {
            return {
                id_car : car.id_car,
                status : car.status,
                autonomy : car.autonomy,
                capacity : car.capacity
            }
        })

        // Return
        return { 
            result : 'ok',
            cars: cars
        }
    })

    server.post("/api/send_order_cars", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received send order cars order with:" + JSON.stringify(requestPayload, null, 2))
        return { 
            result : 'ok'
        }
    })

    server.post("/api/update_order_cars", async (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received update car order with:" + request.requestBody)
        const result = await update_order_cars('', requestPayload)
        
        // Return
        return result.response_body
    })
}
