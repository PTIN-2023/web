import { getNextLatitudeAndLongitude } from "../sphere_movement"

export function seedMirageCars(server) {
  server.create("car", {
    id_car: 1,
    id_route: 0,
    license_plate: "ABC123",
    battery: 75,
    status: 1,
    autonomy: 120,
    capacity: 3,
    last_maintenance_date: "2023-04-15",
    packages: [
      { name: 'ibuprofen' },
      { name: 'ibuprofen' },
      { name: 'ibuprofen' }
    ],
    beehive: "HiveA",
    location_in: {
      latitude: 41.2209492,
      longitude: 1.7298172
    },
    location_act: {
      latitude: 41.2209492,
      longitude: 1.7298172
    },
    location_end: {
      latitude: 41.2280427,
      longitude: 1.7350207
    }
  })
  server.create("car", {
    id_car: 2,
    id_route: 1,
    license_plate: "DEF456",
    battery: 90,
    status: 2,
    autonomy: 180,
    capacity: 5,
    last_maintenance_date: "2023-04-25",
    packages: [
      { name: 'paracetamol' },
      { name: 'paracetamol' },
      { name: 'paracetamol' },
      { name: 'ibuprofen' },
      { name: 'ibuprofen' }
    ],
    beehive: "HiveB",
    location_in: {
      latitude: 41.2229666,
      longitude: 1.7210832
    },
    location_act: {
      latitude: 41.2229666,
      longitude: 1.7210832
    },
    location_end: {
      latitude: 41.2583,
      longitude: 1.7651
    }
  })
}


export function defineMirageCarRoutes(server) {
  // Endpoint which returns the all the information of all the cars
  server.post("/api/cars_full_info", (schema, request) => {
    console.log("Received cars_full_info req with:" + request.requestBody)

    const cars = schema.cars.all().models
    makeAllCarsApproachDestiny(schema)

    return {
      response: 'ok',
      cars
    }
  })

  // Endpoint which returns the positions of all the cars
  server.post("/api/cars_pos_info", (schema, request) => {
    console.log("Received cars_last_pos req with:" + request.requestBody)

    const filteredCars = schema.cars.all().models.map(car => {
      return {
        "id_car": car.id_car,
        "pos_latitude": car.location_act.latitude,
        "pos_longitude": car.location_act.longitude
      };
    });
    makeAllCarsApproachDestiny(schema)

    return {
      response: 'ok',
      cars: filteredCars
    }
  })
}

function makeAllCarsApproachDestiny(schema) {
  const distanceToMove = 20 // in metres

  schema.cars.all().models.map(car => {
    const [new_latitude, new_longitude] = getNextLatitudeAndLongitude(
      car.location_act.latitude, car.location_act.longitude,
      car.location_end.latitude, car.location_end.longitude,
      distanceToMove
    )

    // Update car position
    schema.db.cars.update(
      car.id,
      {
        location_act : {
          latitude: JSON.parse(new_latitude.toFixed(7)),
          longitude: JSON.parse(new_longitude.toFixed(7))
        }
      }
    )
  });
}