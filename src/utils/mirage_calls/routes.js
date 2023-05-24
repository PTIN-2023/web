import hasExpectedFields from '../hasExpectedFields'
import generate_map_route from '../../lib/generate_map_route'

export function seedMirageRoutes(server) {
    server.create("route", {
        "id_route": 0,
        "coordinates": [ 
            [ 1.729895, 41.220972 ], [ 1.730095, 41.220594 ], [ 1.730957, 41.220821 ], [ 1.730341, 41.222103 ], 
            [ 1.732058, 41.222625 ], [ 1.732593, 41.222967 ], [ 1.732913, 41.223435 ], [ 1.733119, 41.224977 ], 
            [ 1.733229, 41.225046 ], [ 1.733257, 41.225324 ], [ 1.733531, 41.225684 ], [ 1.73421, 41.226188 ], 
            [ 1.737807, 41.22931 ], [ 1.738258, 41.229572 ], [ 1.738483, 41.229682 ], [ 1.738329, 41.229879 ], 
            [ 1.738106, 41.229798 ], [ 1.738094, 41.22967 ], [ 1.737657, 41.22918 ], [ 1.737265, 41.228995 ], 
            [ 1.736156, 41.228027 ], [ 1.735887, 41.227883 ], [ 1.735424, 41.228285 ] 
        ]
    })
    server.create("route", {
        "id_route": 1,
        "coordinates": [ 
            [ 41.158471, 1.761918 ], [ 41.161802, 1.769869 ], [ 41.163154, 1.771671 ], [ 41.169183, 1.775638 ], 
            [ 41.172252, 1.781301 ], [ 41.175256, 1.782544 ], [ 41.181639, 1.787091 ], [ 41.183147, 1.790367 ], 
            [ 41.184686, 1.798673 ], [ 41.187411, 1.801901 ], [ 41.187068, 1.80308 ], [ 41.207252, 1.821486 ]
        ]
    })
}

export function defineMirageRoutesRoutes(server) {
    server.post("/api/generate_map_route", async (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        const result = await generate_map_route('', requestPayload)
        
        // Return
        return result.response_body
    })

    // Username+password register endpoint
    server.post("/api/store_route", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
  
      // Check payload
      const expectedFields = [
        "session_token",
        "id_route",
        "coordinates"
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
  
      if (!expectedFieldsOk) {
        return ({
          result : "error",
          description: "Wrong fields"
        })
      }
      // Store if new
      if (!schema.routes.findBy({ id_route : requestPayload.id_route })) {
        schema.db.routes.insert({
          id_route: requestPayload.id_route,
          coordinates: requestPayload.coordinates,
        })
      }
  
      // Return
      return { 
        result : 'ok'
      }
    })

    server.post("/api/get_route", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)

        // Check payload
        const expectedFields = [
            "session_token",
            "id_route",
        ]
        const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

        if (!expectedFieldsOk) {
            return ({
                result : "error",
                description: "Wrong fields"
            })
        }

        // Check validity
        const r = schema.routes.findBy({ id_route : requestPayload.id_route })
        if (!r) {
            return ({
                result : "error",
                description: "Id does not exist"
            })
        }

        // Return
        return { 
            result : 'ok',
            coordinates : r.coordinates
        }
    })
}
