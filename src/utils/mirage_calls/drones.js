import { getNextLatitudeAndLongitude } from "../sphere_movement"

export function seedMirageDrones(server) {
  server.create("drone", {
    id_dron: 1,
    id_route: 0,
    battery: 100,
    status: 3,
    autonomy: 30,
    capacity: 1,
    last_maintenance_date: "2023-05-10",
    id_pack: 100,
    id_beehive: 1,
    location_in: {
      latitude: 41.2209492,
      longitude: 1.7298172,
      altitude: 0,
    },
    location_act: {
      latitude: 41.2209492,
      longitude: 1.7298172,
      altitude: 0,
    },
    location_end: {
      latitude: 41.2280427,
      longitude: 1.7350207,
      altitude: 0,
    },
  });

  server.create("drone", {
    id_dron: 2,
    id_route: 1,
    battery: 80,
    status: 3,
    autonomy: 25,
    capacity: 1,
    last_maintenance_date: "2023-05-08",
    id_pack: 102,
    id_beehive: 2,
    location_in: {
      latitude: 41.2229666,
      longitude: 1.7210832,
      altitude: 0,
    },
    location_act: {
      latitude: 41.2229666,
      longitude: 1.7210832,
      altitude: 0,
    },
    location_end: {
      latitude: 41.2583,
      longitude: 1.7651,
      altitude: 0,
    },
  });
  
  server.create("drone", {
    id_dron: 3,
    id_route: null,
    battery: 80,
    status: 4,
    autonomy: 25,
    capacity: 3,
    last_maintenance_date: "2023-05-08",
    id_pack: null,
    id_beehive: 2,
  });

  server.create("drone", {
    id_dron: 4,
    id_route: null,
    battery: 80,
    status: 4,
    autonomy: 25,
    capacity: 3,
    last_maintenance_date: "2023-05-08",
    id_pack: null,
    id_beehive: 2,
  });

  server.create("drone", {
    id_dron: 5,
    id_route: null,
    battery: 80,
    status: 4,
    autonomy: 25,
    capacity: 7,
    last_maintenance_date: "2023-05-08",
    id_pack: null,
    id_beehive: 2,
  });
}

export function defineMirageDroneRoutes(server) {
  // Endpoint which returns the all the information of all the drones
  server.post("/api/drones_full_info", (schema, request) => {
    console.log("Received drones_full_info req with:" + request.requestBody)

    const drones = schema.drones.all()
    makeAllDronesApproachDestiny(schema)

    return {"response": "ok", "drones": drones.models}
  })

  // Endpoint which returns the positions of all the drones
  server.post("/api/drones_pos_info", (schema, request) => {
    console.log("Received drones_pos_info req with:" + request.requestBody)

    const filteredDrones = schema.drones.all().models.map(drone => {
      return {
        "id_dron": drone.id_dron,
        "latitude": drone.location_act.latitude,
        "longitude": drone.location_act.pos_longitude
      };
    });
    makeAllDronesApproachDestiny(schema)

    return {"response": "ok", "drones": filteredDrones}
  })
}

function makeAllDronesApproachDestiny(schema) {
  const distanceToMove = 2 // in metres

  schema.drones.all().models.map(drone => {
    if(!drone.location_act || !drone.location_end)
      return

    const [new_latitude, new_longitude] = getNextLatitudeAndLongitude(
      drone.location_act.latitude, drone.location_act.longitude,
      drone.location_end.latitude, drone.location_end.longitude,
      distanceToMove
    )

    // Update drone position
    schema.db.drones.update(
      drone.id,
      {
        location_act : {
          latitude: new_latitude,
          longitude: new_longitude
        }
      }
    )
  });
}