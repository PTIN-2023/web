import { getNextLatitudeAndLongitude } from "../sphere_movement"

export function seedMirageDrones(server) {
  server.create("drone", {
    make: "DJI",
    model: "Mavic Air 2",
    pos_latitude: 41.2209492,
    pos_longitude: 1.7298172,
    objective_latitude: 41.2077096,
    objective_longitude: 1.7330467,
    cargo: [
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
    cargo: [
      { name: 'ibuprofen' }
    ]
  })
}

export function defineMirageDroneRoutes(server) {
  // Endpoint which returns the all the information of all the drones
  server.post("/api/drones_full_info", (schema, request) => {
    console.log("Received drones_full_info req with:" + request.requestBody)

    const drones = schema.drones.all()
    makeAllDronesApproachDestiny(schema)

    return drones
  })

  // Endpoint which returns the positions of all the drones
  server.post("/api/drones_pos_info", (schema, request) => {
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