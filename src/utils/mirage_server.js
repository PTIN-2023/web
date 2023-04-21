import { createServer } from "miragejs"
import * as env_config from '../utils/env_config'

export function makeServer() {
    return createServer({
        routes() {
          this.urlPrefix=env_config.getApiEndpoint();

          this.post("/api/login", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            console.log("Received login req with:" + request.requestBody)
            return { 
              result : 'ok',
              role : 'pacient',
              session_token : '3458764568973496'
            }
          })

          this.post("/api/register", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            console.log("Received register req with:" + request.requestBody)
            return { 
              result : 'ok',
              role : 'pacient',
              session_token : '3458764568973496'
            }
          })
        },
    })
  }
