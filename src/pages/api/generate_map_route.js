import * as env_config from "../../utils/env_config"

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
            latitude: 41.2209492,
            longitude: 1.7298172
        },
        location_end: {
            latitude: 41.2280427,
            longitude: 1.7350207
        }
    }

    // Generate route
    const mapbox_public_token = 'pk.eyJ1IjoiYWVrc3AiLCJhIjoiY2xmd2dtbDNhMGU4bjNjbWkwa2VqbzhhciJ9.LYgWVHhGLoY9T-ix_qC73g';
    const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${query.location_in.longitude},${query.location_in.latitude};${query.location_end.longitude},${query.location_end.latitude}?geometries=geojson&access_token=${mapbox_public_token}`
    ).then(data => data.json());
    
    if(!response || response.code != 'Ok' || !response.routes || !response.routes[0])
        return

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