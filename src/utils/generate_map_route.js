
export default async function generate_map_route(query) {
    const mapbox_public_token = 'pk.eyJ1IjoiYWVrc3AiLCJhIjoiY2xmd2dtbDNhMGU4bjNjbWkwa2VqbzhhciJ9.LYgWVHhGLoY9T-ix_qC73g';
    const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${query.location_in.longitude},${query.location_in.latitude};${query.location_end.longitude},${query.location_end.latitude}?geometries=geojson&access_token=${mapbox_public_token}`
    ).then(data => data.json());

    if(!response || response.code != 'Ok' || !response.routes || !response.routes[0])
        return null
    else
        return response
}