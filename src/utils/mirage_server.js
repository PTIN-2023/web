import { createServer, Model } from "miragejs"
import * as env_config from '../utils/env_config'
import inventario_json from '../../public/inventario.json'

// Calculates the next latitude and longitude after traveling $distance from 
// (pos_latitude, pos_longitude) to (objective_latitude, objective_longitude).
// All the values are assumed to be in degrees and metres
function getNextLatitudeAndLongitude(pos_latitude, pos_longitude, objective_latitude, objective_longitude, distance) {
    // Convert degrees into radians
    const φ1 = pos_latitude        * (Math.PI/180)
    const φ2 = objective_latitude  * (Math.PI/180)
    const λ1 = pos_longitude       * (Math.PI/180)
    const λ2 = objective_longitude * (Math.PI/180)

    // Get bearing as explained in https://www.movable-type.co.uk/scripts/latlong.html#bearing
    const y = Math.sin(λ2-λ1) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) -
              Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
    const brng = Math.atan2(y, x);
    
    // Get position having traveled distance_increment as explained in https://www.movable-type.co.uk/scripts/latlong.html#dest-point
    const earth_radius = 6371e3;
    const φ3 = Math.asin( Math.sin(φ1)*Math.cos(distance/earth_radius) +
                      Math.cos(φ1)*Math.sin(distance/earth_radius)*Math.cos(brng) );
    const λ3 = λ1 + Math.atan2(Math.sin(brng)*Math.sin(distance/earth_radius)*Math.cos(φ1),
                           Math.cos(distance/earth_radius)-Math.sin(φ1)*Math.sin(φ3));

    // Convert radians into degrees
    const new_latitude  = (φ3*180/Math.PI + 360) % 360
    const new_longitude = (λ3*180/Math.PI + 360) % 360

    return [new_latitude, new_longitude]
}

function makeAllCarsApproachDestiny(schema) {
  const distanceToMove = 20 // in metres

  schema.cars.all().models.map(car => {
    const [new_latitude, new_longitude] = getNextLatitudeAndLongitude(
      car.pos_latitude, car.pos_longitude, 
      car.objective_latitude, car.objective_longitude,
      distanceToMove
    )

    // Update car position
    schema.db.cars.update(
      car.id,
      {
        pos_latitude: new_latitude,
        pos_longitude: new_longitude
      }
    )
  });
}

function makeAllDronesApproachDestiny(schema) {
  const distanceToMove = 2 // in metres

  schema.drones.all().models.map(drone => {
    const [new_latitude, new_longitude] = getNextLatitudeAndLongitude(
      drone.pos_latitude, drone.pos_longitude, 
      drone.objective_latitude, drone.objective_longitude,
      distanceToMove
    )

    // Update drone position
    schema.db.drones.update(
      drone.id,
      {
        pos_latitude: new_latitude,
        pos_longitude: new_longitude
      }
    )
  });
}

export function makeServer() {
    return createServer({
        models: {
          cars: Model,
          drones: Model
        },

        seeds(server) {
          server.create("car", { 
            make: "Toyota",
            model: "Camry",
            pos_latitude: 41.2209492,
            pos_longitude: 1.7298172,
            objective_latitude: 41.2280427,
            objective_longitude: 1.7350207,
            cargo : [
              { name: 'ibuprofeno' },
              { name: 'ibuprofeno' }, 
              { name: 'ibuprofeno' }
            ]
          })
          server.create("car", { 
            make: "Honda",
            model: "Civic",
            pos_latitude: 41.2209492,
            pos_longitude: 1.7298172,
            objective_latitude: 41.3994323,
            objective_longitude: 2.1458492,
            cargo : [
              { name: 'ibuprofeno' },
              { name: 'ibuprofeno' }, 
              { name: 'ibuprofeno' }
            ]
          })
          server.create("drone", {
            make: "DJI",
            model: "Mavic Air 2",
            pos_latitude: 41.2209492,
            pos_longitude: 1.7298172,
            objective_latitude: 41.2077096,
            objective_longitude: 1.7330467,
            cargo : [
              { name: 'ibuprofen' }
            ]
          })
            server.create("drone", {
            make: "Parrot",
            model: "Anafi USA",
            pos_latitude: 41.2209492,
            pos_longitude: 1.7298172,
            objective_latitude: 41.241707,
            objective_longitude: 1.7342994,
            cargo : [
              { name: 'ibuprofen' }
            ]
          })
        },

        routes() {
          // Setup config + passthrough
          this.passthrough("https://api.mapbox.com/**")
          this.passthrough("https://events.mapbox.com/**")
          this.urlPrefix=env_config.getApiEndpoint();

          // Basic login endpoint
          this.post("/api/login", (schema, request) => {
            console.log("Received login req with:" + request.requestBody)
            return { 
              result : 'ok',
              role : 'pacient',
              session_token : '3458764568973496'
            }
          })

          // Basic register endpoint. TODO: simulate diferent logins depending on the user email
          this.post("/api/register", (schema, request) => {
            console.log("Received register req with:" + request.requestBody)

            return { 
              result : 'ok',
              role : 'pacient',
              session_token : '3458764568973496'
            }
          })

          // Basic medicine list endpoint. TODO: simulate filters
          this.post("/api/medicines_list", (schema, request) => {
            console.log("Received medicine list req with:" + request.requestBody)

            return { 
              result : 'ok',
              inventario_json
            }
          })

          // Endpoint which returns the all the information of all the cars
          this.post("/api/cars_full_info", (schema, request) => {
            console.log("Received cars_full_info req with:" + request.requestBody)
            
            const cars = schema.cars.all()
            makeAllCarsApproachDestiny(schema, '100')

            return cars
          })

          // Endpoint which returns the positions of all the cars
          this.post("/api/cars_pos_info", (schema, request) => {
            console.log("Received cars_last_pos req with:" + request.requestBody)

            const filteredCars = schema.cars.all().models.map(car => {
              return {
                "id": car.id,
                "pos_latitude": car.pos_latitude,
                "pos_longitude": car.pos_longitude
              };
            });
            makeAllCarsApproachDestiny(schema)

            return filteredCars
          })

          // Endpoint which returns the all the information of all the drones
          this.post("/api/drones_full_info", (schema, request) => {
            console.log("Received drones_full_info req with:" + request.requestBody)
            
            const drones = schema.drones.all()
            makeAllDronesApproachDestiny(schema)

            return drones
          })

          // Endpoint which returns the positions of all the drones
          this.post("/api/drones_pos_info", (schema, request) => {
            console.log("Received drones_pos_info req with:" + request.requestBody)

            const filteredDrones = schema.drones.all().models.map(drone => {
              return {
                "id": drone.id,
                "pos_latitude": drone.pos_latitude,
                "pos_longitude": drone.pos_longitude
              };
            });
            makeAllDronesApproachDestiny(schema)

            return filteredDrones
          })
        }
    })
  }
