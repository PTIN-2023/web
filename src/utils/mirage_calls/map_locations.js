export function seedMirageMapLocations(server) {
  server.create("beehive", {
    id_beehive: 1,
    latitude: 41.2278786,
    longitude: 1.7474957,
  });
  server.create("beehive", {
    id_beehive: 2,
    latitude: 41.2077096,
    longitude: 1.7330467,
  });
}

export function defineMirageMapLocationsRoutes(server) {
  // Endpoint which returns the complete list of beehives
  server.post("/api/beehives_global", (schema, request) => {
    console.log("Received beehives_global req with:" + request.requestBody)

    return {"response": "ok", "beehives": schema.beehives.all().models}
  })

  // Endpoint which returns the "local" beehives
  server.post("/api/beehives_local", (schema, request) => {
    console.log("Received beehives_local req with:" + request.requestBody)

    const beehive = schema.beehives.findBy({id_beehive: 1})

    return {
      "response": "ok", 
      "latitude": beehive.latitude,
      "longitude" : beehive.longitude
    }
  })

  // Endpoint which returns the information of our store
  server.post("/api/store_coordinates", (schema, request) => {
    console.log("Received store_info req with:" + request.requestBody)
    return {
      "st_longitude": 1.7474957,
      "st_latitude": 41.2278786
    }
  })
}