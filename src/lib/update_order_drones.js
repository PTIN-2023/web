import hasExpectedFields from "../utils/hasExpectedFields"
import check_token_req from "./check_token_req"
import generate_map_route from "./generate_map_route"

export default async function update_order_drones(api_endpoint, requestPayload) {    
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
    console.log("[update_order_drones] checking token")

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

    // Get available drones
    console.log("[update_order_drones] getting the available drones")

    const list_drones_response = await fetch(api_endpoint+'/api/list_available_drones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_token : session_token
        })
    }).then(data => data.json())

    if(!list_drones_response || list_drones_response.result != 'ok') {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Error getting available drones: " + (list_drones_response ? list_drones_response.result + ' ' + list_drones_response.description : '')
            }
        })
    }

    // Get orders to send
    console.log("[update_order_drones] getting the orders to send")

    const list_orders_to_send_drones_response = await fetch(api_endpoint+'/api/list_orders_to_send_drones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_token : session_token
        })
    }).then(data => data.json())

    if(!list_orders_to_send_drones_response || list_orders_to_send_drones_response.result != 'ok') {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Error getting the orders to send: " + (list_orders_to_send_drones_response ? list_orders_to_send_drones_response.result + ' ' + list_orders_to_send_drones_response.description : '')
            }
        })
    }

    // Get local beehive storage position
    console.log("[update_order_drones] getting the beehive storage pos")

    const storage_position_response = await fetch(api_endpoint+'/api/beehives_local', {
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
                description: "Error getting the local beehive storage pos: " + (storage_position_response ? storage_position_response.result + ' ' + storage_position_response.description : '')
            }
        })
    }

    // Sort drones and orders
    console.log("[update_order_drones] sorting orders and drones")
    let orders = list_orders_to_send_drones_response.orders.sort((a, b) => {
        if(a.medicine_list.length == b.medicine_list.length)
            return 0
        if(a.medicine_list.length <  b.medicine_list.length)
            return 1
        return -1
    })
    
    const drones = list_drones_response.drones.sort((a, b) => {
        if(a.capacity == b.capacity)
            return 0
        if(a.capacity <  b.capacity)
            return 1
        return -1
    })

    // Match orders and drones
    console.log("[update_order_drones] matching orders and drones")
    let matches = []
    drones.some((drone) => {
        matches.push({
            id_drone : drone.id_drone,
            order : orders.shift()
        })
        return orders.length == 0
    })

    // Generate route and assignations for matched drones
    console.log("[update_order_drones] generating routes and assignations")
    let assignations = []
    const location_act = {
        latitude : storage_position_response.latitude,
        longitude : storage_position_response.longitude
    }
    
    for (const match of matches) {
        const location_end = {
            latitude : match.order.coords_destiny.latitude,
            longitude : match.order.coords_destiny.longitude
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

        assignations.push({
            id_drone : match.id_drone,
            route : {
                id_route : generate_route_response.response_body.id_route,
                coordinates : generate_route_response.response_body.coordinates,
            },
            order : match.order
        })
    }

    // Send car order
    console.log("[update_order_drones] sending order")
    const send_order_response = await fetch(api_endpoint+'/api/send_order_drones', {
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