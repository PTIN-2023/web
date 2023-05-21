import { createServer, Model } from "miragejs"

createServer({
    routes() {
        this.namespace = "api"

        this.get("/meds", () => {
            return {
                meds: [
                    { id:1, name: "Ibuprofeno", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:2, name: "Omeoprazol", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:3, name: "Amoxicilina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:4, name: "Metformina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:5, name: "Lorazepam", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:6, name: "Aspirina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:7, name: "Cetirizina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:8, name: "Metroprolol", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:9, name: "Simvastatina", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                    { id:10, name: "Ibuprofeno", pvp: "4,68", forma: "solido", via: "oral", page: 1 },
                ],
            }
        })
    },
})