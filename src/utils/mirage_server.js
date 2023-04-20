import { createServer } from "miragejs"
import * as env_config from '../utils/env_config'

export function makeServer() {
    return createServer({
        routes() {
          this.urlPrefix=env_config.getApiEndpoint();

          this.get("/api/users", () => [
            { id: "1", name: "John1" },
            { id: "2", name: "John2" },
            { id: "3", name: "John3" },
          ])
        },
    })
  }
