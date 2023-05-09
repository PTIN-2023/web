import { getNextLatitudeAndLongitude } from "../sphere_movement"

export function seedMirageCars(server) {
  server.create("car", {
    make: "Toyota",
    model: "Camry",
    pos_latitude: 41.2209492,
    pos_longitude: 1.7298172,
    objective_latitude: 41.2280427,
    objective_longitude: 1.7350207,
    cargo: [
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
    objective_latitude: 41.2583,
    objective_longitude: 1.7651,
    cargo: [
      { name: 'ibuprofeno' },
      { name: 'ibuprofeno' },
      { name: 'ibuprofeno' }
    ]
  })
}

export function defineMirageCarRoutes(server) {
  // Endpoint which returns the all the information of all the cars
  server.post("/api/cars_full_info", (schema, request) => {
    console.log("Received cars_full_info req with:" + request.requestBody)

    const cars = schema.cars.all()
    makeAllCarsApproachDestiny(schema, '100')

    return cars
  })

  // Endpoint which returns the positions of all the cars
  server.post("/api/cars_pos_info", (schema, request) => {
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