export function seedMirageMapLocations(server) {
  server.create("beehive", {
    id_beehive: 1,
    latitude: 41.227250,
    longitude: 1.714917,
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

    return {"result": "ok", "beehives": schema.beehives.all().models}
  })

  // Endpoint which returns the "local" beehives
  server.post("/api/beehives_local", (schema, request) => {
    console.log("Received beehives_local req with:" + request.requestBody)

    const beehive = schema.beehives.findBy({id_beehive: 1})

    return {
      "result": "ok", 
      "latitude": beehive.latitude,
      "longitude" : beehive.longitude
    }
  })

  // Endpoint which returns the position of the general storage position
  server.post("/api/general_storage_pos", (schema, request) => {
    console.log("Received strorage req with:" + request.requestBody)
    return {
      "result" : 'ok',
      "latitude": 41.2278786,
      "longitude": 1.7474957
    }
  })
}