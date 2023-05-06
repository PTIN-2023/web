// Calculates the next latitude and longitude after traveling $distance from 
// (pos_latitude, pos_longitude) to (objective_latitude, objective_longitude).
// All the values are assumed to be in degrees and metres
export function getNextLatitudeAndLongitude(pos_latitude, pos_longitude, objective_latitude, objective_longitude, distance) {
    // Convert degrees into radians
    const φ1 = pos_latitude * (Math.PI / 180)
    const φ2 = objective_latitude * (Math.PI / 180)
    const λ1 = pos_longitude * (Math.PI / 180)
    const λ2 = objective_longitude * (Math.PI / 180)
  
    // Get bearing as explained in https://www.movable-type.co.uk/scripts/latlong.html#bearing
    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
      Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    const brng = Math.atan2(y, x);
  
    // Get position having traveled distance_increment as explained in https://www.movable-type.co.uk/scripts/latlong.html#dest-point
    const earth_radius = 6371e3;
    const φ3 = Math.asin(Math.sin(φ1) * Math.cos(distance / earth_radius) +
      Math.cos(φ1) * Math.sin(distance / earth_radius) * Math.cos(brng));
    const λ3 = λ1 + Math.atan2(Math.sin(brng) * Math.sin(distance / earth_radius) * Math.cos(φ1),
      Math.cos(distance / earth_radius) - Math.sin(φ1) * Math.sin(φ3));
  
    // Convert radians into degrees
    const new_latitude = (φ3 * 180 / Math.PI + 360) % 360
    const new_longitude = (λ3 * 180 / Math.PI + 360) % 360
  
    return [new_latitude, new_longitude]
  }