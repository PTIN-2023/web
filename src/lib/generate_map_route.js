import hasExpectedFields from "../utils/hasExpectedFields";
import check_token_req from "../lib/check_token_req"

// Tries to generate a route and store it. It will fail if the payload does not
// have session_token, location_act and location_end or if the token is invalid.
// This returns an object with response_code and response_body

export default async function generate_map_route(api_endpoint, requestPayload) {
    // Check payload

    const expectedFields = [
    "session_token",
    "location_act",
    "location_end"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
    if (!expectedFieldsOk || 
        isNaN(requestPayload.location_act.latitude)  || 
        isNaN(requestPayload.location_act.longitude) || 
        isNaN(requestPayload.location_end.latitude)  || 
        isNaN(requestPayload.location_end.longitude)) {
        return ({
            response_code : 400,
            response_body : {
                result : "error",
                description: "Wrong fields"
            }
        })
    }

    // Check token

    const session_token = requestPayload.session_token
    const valid = await check_token_req(api_endpoint, session_token, 'internal')
/*     if(!valid) {
        return ({
            response_code : 403,
            response_body : {
                result : "error",
                description: "Error checking token"
            }
        })
    } */

    // Generate route

    const location_in = {
        longitude: requestPayload.location_act.longitude,
        latitude: requestPayload.location_act.latitude
    }
    const location_end = {
        longitude: requestPayload.location_end.longitude,
        latitude: requestPayload.location_end.latitude
    }

    const mapbox_public_token = 'pk.eyJ1IjoiYWVrc3AiLCJhIjoiY2xmd2dtbDNhMGU4bjNjbWkwa2VqbzhhciJ9.LYgWVHhGLoY9T-ix_qC73g';
    const mapbox_response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${location_in.longitude},${location_in.latitude};${location_end.longitude},${location_end.latitude}?geometries=geojson&access_token=${mapbox_public_token}`
    ).then(data => data.json());

    if(!mapbox_response || mapbox_response.code != 'Ok' || !mapbox_response.routes || !mapbox_response.routes[0]) {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Cannot generate route"
            }
        })
    }

    // Store route
    
    const store_response = await fetch(api_endpoint+'/api/store_route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_token : session_token,
            id_route : mapbox_response.uuid,
            coordinates : mapbox_response.routes[0].geometry.coordinates
        })
    }).then(data => data.json())

    if(!store_response || store_response.result != 'ok') {
        return ({
            response_code : 500,
            response_body : {
                result : "error",
                description: "Error storing generated route: " + (store_response ? store_response.result + ' ' + store_response.description : '')
            }
        })
    }

    // Return

    return ({
        response_code : 200,
        response_body : {
            result : 'ok',
            id_route : mapbox_response.uuid,
            coordinates :  mapbox_response.routes[0].geometry.coordinates
        }
    })
}