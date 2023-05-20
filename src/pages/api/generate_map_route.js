import * as env_config from "../../utils/env_config"
import generate_map_route from "../../utils/generate_map_route";

export default async function handler(req, res) {
    const { session_token, location_act, location_end } = req.body;

    if (!session_token || !location_act || !location_end) {
      return res.status(400).json({ result: 'Missing required fields' });
    }
  
    // Check that the latitude and longitude values are numbers
    const { latitude: act_lat, longitude: act_lon } = location_act;
    const { latitude: end_lat, longitude: end_lon } = location_end;
    if (isNaN(act_lat) || isNaN(act_lon) || isNaN(end_lat) || isNaN(end_lon)) {
      return res.status(400).json({ result: 'Invalid location values' });
    }

    // Check token
    const response_check_token = await fetch(env_config.getApiEndpoint()+'/api/checktoken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token : session_token})
    }).then(data => data.json())

    if(!response_check_token || response_check_token.valid != 'yes')
        return res.status(403).json({ result: 'Invalid token' })
    
    // Extract from and to
    const query = {
        location_in: {
            longitude: act_lat,
            latitude: act_lon
        },
        location_end: {
            longitude: end_lat,
            latitude: end_lon
        }
    }

    // Generate route
    const response = await generate_map_route(query)

    if(!response)
        return res.status(500).json({ result: 'Error generating route' })

    const coordinates = response.routes[0].geometry.coordinates

    // Store route
    fetch(env_config.getApiEndpoint()+'/api/store_route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({session_token : session_token, id_route : response.uuid, coordinates : coordinates})
    })

    // Return value
    return res.status(200).json({
        result : 'ok',
        id_route : response.uuid,
        coordinates : coordinates
    })
}