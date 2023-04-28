import { createServer, Model } from "miragejs"

createServer({
    routes() {
        this.namespace = "api"

        this.get("/meds", () => {
            return {
                meds: [
                    { id:1, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "30 comprimidos 4,68$", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral" },
                    { id:2, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "30 comprimidos 4,68$", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral" },
                ],
            }
        })
    },
})