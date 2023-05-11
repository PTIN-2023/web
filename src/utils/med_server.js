import { createServer, Model } from "miragejs"

createServer({
    routes() {
        this.namespace = "api"

        this.get("/meds", () => {
            return {
                meds: [
                    { id:1, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:2, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:3, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:4, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:5, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:6, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:7, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:8, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:9, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:10, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
                    { id:11, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "4,68€", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
                    detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 2 }
                ],
            }
        })
    },
})