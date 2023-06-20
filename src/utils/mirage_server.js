import { createServer, Model } from "miragejs"
import * as env_config from '../utils/env_config'
import { seedMirageCars, defineMirageCarRoutes } from "./mirage_calls/cars"
import { seedMirageDrones, defineMirageDroneRoutes } from "./mirage_calls/drones"
import { seedMirageAuth, defineMirageAuthRoutes } from "./mirage_calls/auth"
import { seedMirageMapLocations, defineMirageMapLocationsRoutes } from "./mirage_calls/map_locations"
import { seedMirageMisc, defineMirageMiscRoutes } from "./mirage_calls/misc"
import { seedMirageMakeOrders, defineMakeOrdersRoutes } from "./mirage_calls/make_orders"
import { seedMirageMyOrders, defineMirageMyOrdersRoutes } from "./mirage_calls/my_orders"
import { seedMirageStats, defineMirageStatsRoutes } from "./mirage_calls/stats"
import { seedMirageDoctorsNotifications, defineMirageDoctorsNotificationsRoutes } from "./mirage_calls/doctors_notifications"
import { seedMirageUserInf, defineMirageProfileRoutes } from "./mirage_calls/profile"
import { seedMirageRoutes, defineMirageRoutesRoutes } from "./mirage_calls/routes"
import { seedMirageUpdate, defineMirageUpdateRoutes } from "./mirage_calls/update"
import { defineMirageDoctorsPrescriptionsRoutes, seedMirageDoctorsPrescriptions } from "./mirage_calls/doctors_prescriptions"

export function makeServer() {
  return createServer({
    models: {
      tokens : Model,
      users: Model,
      cars: Model,
      drones: Model,
      medicines: Model,
      prescriptions : Model,
      stats: Model,
      orders : Model,
      beehives : Model,
      notifications : Model,
      routes : Model
    },

    seeds(server) {
      if(typeof window !== 'undefined') {
          const dbData = localStorage.getItem('db');
      if (dbData) {
        // https://miragejs.com/api/classes/db/#load-data
        server.db.loadData(JSON.parse(dbData));
      } else {
          seedMirageCars(server)
          seedMirageDrones(server)
          seedMirageAuth(server)
          seedMirageMapLocations(server)
          seedMirageMisc(server)
          seedMirageMakeOrders(server)
          seedMirageStats(server)
          seedMirageMyOrders(server)
          seedMirageDoctorsNotifications(server)
          seedMirageUserInf(server)
          seedMirageRoutes(server)
          seedMirageUpdate(server)
          seedMirageDoctorsPrescriptions(server)
        }
      }
    },

    routes() {
      this.urlPrefix=env_config.getApiEndpoint();

      defineMirageCarRoutes(this)
      defineMirageDroneRoutes(this)
      defineMirageAuthRoutes(this)
      defineMirageMapLocationsRoutes(this)
      defineMirageMiscRoutes(this)
      defineMakeOrdersRoutes(this)
      defineMirageStatsRoutes(this)
      defineMirageMyOrdersRoutes(this)
      defineMirageDoctorsNotificationsRoutes(this)
      defineMirageProfileRoutes(this)
      defineMirageRoutesRoutes(this)
      defineMirageUpdateRoutes(this)
      defineMirageDoctorsPrescriptionsRoutes(this)

      this.passthrough("https://api.mapbox.com/**")
      this.passthrough("https://events.mapbox.com/**")
      this.passthrough('https://www.googleapis.com/**'); 
      this.passthrough('http://localhost:5000/**'); 
      this.passthrough()
    }
  })
}
