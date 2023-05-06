export function seedMirageMapLocations(server) {}

export function defineMirageMapLocationsRoutes(server) {
  // Endpoint which returns the information of our store
  server.post("/api/store_coordinates", (schema, request) => {
    console.log("Received store_info req with:" + request.requestBody)
    return {
      "st_longitude": 1.7474957,
      "st_latitude": 41.2278786
    }
  })
}