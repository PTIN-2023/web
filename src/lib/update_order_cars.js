import hasExpectedFields from "../utils/hasExpectedFields"
import check_token_req from "./check_token_req"
import generate_map_route from "./generate_map_route"

export default async function update_order_cars(api_endpoint, requestPayload) {    
    // Check payload

    const expectedFields = [
        "session_token"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
    if (!expectedFieldsOk) {
        return ({
            response_code : 400,
            response_body : {
                result : "error",
                description: "Wrong fields"
            }
        })
    }

    // Check token
    console.log("[update_order_cars] checking token")

    const session_token = requestPayload.session_token
    const valid = await check_token_req(api_endpoint, session_token, 'internal')
    if(!valid) {
        return ({
            response_code : 403,
            response_body : {
                result : "error",
                description: "Error checking token"
            }
        })
    }

    // Get available cars
    console.log("[update_order_cars] getting the available cars")

    const list_cars_response = await fetch(api_endpoint+'/api/list_available_cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_token : session_token
        })
    }).then(data => data.json())

    if(!list_cars_response || list_cars_response.result != 'ok') {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Error getting available cars: " + (list_cars_response ? list_cars_response.result + ' ' + list_cars_response.description : '')
            }
        })
    }

    // Get orders to send
    console.log("[update_order_cars] getting the orders to send")

    const list_orders_to_send_cars_response = await fetch(api_endpoint+'/api/list_orders_to_send_cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_token : session_token
        })
    }).then(data => data.json())

    if(!list_orders_to_send_cars_response || list_orders_to_send_cars_response.result != 'ok') {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Error getting the orders to send: " + (list_orders_to_send_cars_response ? list_orders_to_send_cars_response.result + ' ' + list_orders_to_send_cars_response.description : '')
            }
        })
    }

    // Get general storage position
    console.log("[update_order_cars] getting the storage position")

    const storage_position_response = await fetch(api_endpoint+'/api/general_storage_pos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_token : session_token
        })
    }).then(data => data.json())

    if(!storage_position_response || storage_position_response.result != 'ok') {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Error getting the general storage pos: " + (storage_position_response ? storage_position_response.result + ' ' + storage_position_response.description : '')
            }
        })
    }

    // Group orders by destiny
    console.log("[update_order_cars] grouping orders")
    const order_destines = new Map();
    list_orders_to_send_cars_response.orders.map((order) => {
        const key = order.beehive_coords_destiny.id_beehive
        const current_entry = order_destines.get(key)
        order_destines.set(key,
            current_entry 
            ? [...current_entry, order]
            : [order]
        )
    })

    // Sort cars and orders
    console.log("[update_order_cars] sorting orders and cars")
    order_destines.forEach((value, key, map) => {
        value.sort((a, b) => {
            if(a.medicine_list.length == b.medicine_list.length)
                return 0
            if(a.medicine_list.length <  b.medicine_list.length)
                return 1
            return -1
        })
        map.set(key, value)
    })
    
    const cars = list_cars_response.cars.sort((a, b) => {
        if(a.capacity == b.capacity)
            return 0
        if(a.capacity <  b.capacity)
            return 1
        return -1
    })

    // Match orders and cars
    console.log("[update_order_cars] matching orders and cars")
    let matches = []
    cars.forEach((car) => {
        // Find the destination with the largest first order
        let max_medicine_count = Number.NEGATIVE_INFINITY
        let max_order_destination = null

        order_destines.forEach((orders, destination_id, _) => {
            const first_order = orders[0]
            const medicine_count = first_order.medicine_list.length
            if (medicine_count > max_medicine_count) {
                max_medicine_count = medicine_count
                max_order_destination = destination_id
            }
        })

        // Interrupt if it is null
        if(!max_order_destination)
            return;

        // Get the list of orders that fit in the car
        const orders = order_destines.get(max_order_destination);
        const capacity = car.capacity
        let order_size = 0
        let selected_orders = []

        orders.some((order) => {
            if (order_size+order.medicine_list.length <= capacity) {
                order_size += order.medicine_list.length
                selected_orders.push(order)
            }

            return order_size == capacity
        })

        // Remove the selected orders from order_destinies
        const remaining_orders = orders.filter((value) => !selected_orders.includes(value))
        order_destines.set(max_order_destination, remaining_orders)

        matches.push({
            id_car : car.id_car,
            orders : selected_orders
        })
    })

    // Generate route and assignations for matched cars
    console.log("[update_order_cars] generating routes and assignations")
    let assignations = []
    const location_act = {
        latitude : storage_position_response.latitude,
        longitude : storage_position_response.longitude
    }
    
    for (const match of matches) {
        const location_end = {
            latitude : match.orders[0].beehive_coords_destiny.latitude,
            longitude : match.orders[0].beehive_coords_destiny.longitude
        }
        
        const generate_route_response = await generate_map_route(api_endpoint, {
            session_token : session_token,
            location_act : location_act,
            location_end : location_end
        })

        if(generate_route_response.response_code != 200) {
            return ({
                response_code : 500,
                response_body : {
                    result : "error",
                    description: "Error generating route: " + generate_route_response.description
                }
            })
        }
        
        const cargo = match.orders.map((order) => {
            return {
                order_identifier : order.order_identifier,
                medicine_list : order.medicine_list
            }
        })

        console.log(cargo)

        assignations.push({
            id_car : match.id_car,
            id_beehive : match.orders[0].beehive_coords_destiny.id_beehive,
            route : {
                id_route : generate_route_response.response_body.id_route,
                coordinates : generate_route_response.response_body.coordinates,
            },
            cargo : cargo
        })
    }

    // Send car order
    console.log("[update_order_cars] sending order")
    const send_order_response = await fetch(api_endpoint+'/api/send_order_cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_token : session_token,
            assignations : assignations
        })
    }).then(data => data.json())

    if(!send_order_response || send_order_response.result != 'ok') {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Error sending order: " + send_order_response.description
            }
        })
    }

    return ({
        response_code : 200,
        response_body : {
            result : 'ok'
        }
    })
}