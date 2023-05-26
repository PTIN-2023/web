import hasExpectedFields from '../hasExpectedFields'
import update_order_cars from '../../lib/update_order_cars'
import update_order_drones from '../../lib/update_order_drones'

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

    server.post("/api/list_orders_to_send_drones", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received list order to send drone req with:" + request.requestBody)

        // Check payload
        const expectedFields = [
            "session_token"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        // Get orders
        const orders = schema.orders.where((order) => order.state === 'car_sent' && order.order_identifier % 2 == 0).models.map((order) => {
            return {
                order_identifier : order.order_identifier,
                medicine_list : order.medicine_list,
                date : order.date,
                state : order.state,
                coords_destiny : {latitude: 41.190724, longitude: 1.8050001}
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

    server.post("/api/list_available_drones", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received list available drones req with:" + request.requestBody)

        // Check payload
        const expectedFields = [
            "session_token"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        // Get drones
        const DRONE_IDLE_STATUS = 4
        const drones = schema.drones.where((drone) => drone.status == DRONE_IDLE_STATUS).models.map((drone) => {
            return {
                id_dron : drone.id_dron,
                status : drone.status,
                autonomy : drone.autonomy,
                capacity : drone.capacity
            }
        })

        // Return
        return { 
            result : 'ok',
            drones: drones
        }
    })

    server.post("/api/send_order_cars", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received send order cars order with:" + JSON.stringify(requestPayload, null, 2))

        // Check payload
        const expectedFields = [
            "session_token",
            "assignations"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        // Set orders as car_sent
        requestPayload.assignations.forEach((assignation) => {
            assignation.cargo.forEach((order) => {
                const order_entry = schema.orders.findBy({order_identifier : order.order_identifier})
                schema.db.orders.update(
                    order_entry.id,
                    {
                      state: 'car_sent'
                    }
                )
            })
        })

        return { 
            result : 'ok'
        }
    })

    server.post("/api/send_order_drones", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received send order drones with:" + JSON.stringify(requestPayload, null, 2))

        // Check payload
        const expectedFields = [
            "session_token",
            "assignations"
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
        if (!expectedFieldsOk) {
            return {result : 'error_fields'}
        }

        // Set orders as drone_sent
        requestPayload.assignations.forEach((assignation) => {
            const order_entry = schema.orders.findBy({order_identifier : assignation.order.order_identifier})
            schema.db.orders.update(
                order_entry.id,
                {
                    state: 'drone_sent'
                }
            )
        })

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

    server.post("/api/update_order_drones", async (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        console.log("Received update drones order with:" + request.requestBody)
        const result = await update_order_drones('', requestPayload)
        
        // Return
        return result.response_body
    })
}
