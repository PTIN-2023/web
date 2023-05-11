import { createServer, Model } from "miragejs"
import * as env_config from '../utils/env_config'
import { seedMirageCars, defineMirageCarRoutes } from "./mirage_calls/cars"
import { seedMirageDrones, defineMirageDroneRoutes } from "./mirage_calls/drones"
import { seedMirageAuth, defineMirageAuthRoutes } from "./mirage_calls/auth"
import { seedMirageMapLocations, defineMirageMapLocationsRoutes } from "./mirage_calls/map_locations"
import { seedMirageMisc, defineMirageMiscRoutes } from "./mirage_calls/misc"
import { seedMirageMakeOrders, defineMakeOrdersRoutes } from "./mirage_calls/make_orders"
import { seedMirageMyOrders, defineMirageMyOrdersRoutes } from "./mirage_calls/my_orders"

export function makeServer() {
  return createServer({
    models: {
      tokens : Model,
      users: Model,
      cars: Model,
      drones: Model,
      medicines: Model,
      prescriptions : Model,
      orders : Model
    },

    seeds(server) {
      seedMirageCars(server)
      seedMirageDrones(server)
      seedMirageAuth(server)
      seedMirageMapLocations(server)
      seedMirageMisc(server)
      seedMirageMakeOrders(server)
      seedMirageMyOrders(server)
    },

    routes() {
      this.urlPrefix=env_config.getApiEndpoint();

      defineMirageCarRoutes(this)
      defineMirageDroneRoutes(this)
      defineMirageAuthRoutes(this)
      defineMirageMapLocationsRoutes(this)
      defineMirageMiscRoutes(this)
      defineMakeOrdersRoutes(this)
      defineMirageMyOrdersRoutes(this)

      this.passthrough("https://api.mapbox.com/**")
      this.passthrough("https://events.mapbox.com/**")
      this.passthrough('https://www.googleapis.com/**');  
    }
  })
}
