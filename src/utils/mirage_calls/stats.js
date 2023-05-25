import hasExpectedFields from '../hasExpectedFields'

export function seedMirageStats(server) {

  server.create("stat", {
    stat_type:"sells_comparation_query",
    sells_comparation_query:[
      {
        name: 'Enero',
        anterior: 4000,
        actual: 2400
      },
      {
        name: 'Fabrero',
        anterior: 3000,
        actual: 1398
      },
      {
        name: 'Marzo',
        anterior: 2000,
        actual: 9800
      },
      {
        name: 'Abril',
        anterior: 2780,
        actual: 3908
      },
      {
        name: 'Mayo',
        anterior: 1890,
        actual: 4800
      },
      {
        name: 'Junio',
        anterior: 2390,
        actual: 3800
      },
      {
        name: 'Julio',
        anterior: 3490,
        actual: 4300
      },
      {
        name: 'Septiembre',
        anterior: 3490,
        actual: 4300
      },
      {
        name: 'Octubre',
        anterior: 3490,
        actual: 4300
      },
      {
        name: 'Noviembre',
        anterior: 3490,
        actual: 4300
      },
      {
        name: 'Diciembre',
        anterior: 3490,
        actual: 4300
      },
    ],
  })
  server.create("stat", {
    stat_type:"topSeller_meds_query",
    topSeller_meds_query:[
      {
        name: 'Ibuprofeno',
        cantidad: 4000
      },
      {
        name: 'Heparina',
        cantidad: 3000
      },
      {
        name: 'Dolocatil',
        cantidad: 2000,
  
      },
      {
        name: 'Dalsy',
        cantidad: 2780
      },
      {
        name: 'Pectoxlisina',
        cantidad: 1890
      },
      {
        name: 'Apiretal',
        cantidad: 2390
      },
      {
        name: 'Omeprazol',
        cantidad: 3490
      },
      {
        name: 'Enantyum',
        cantidad: 3490
      },
      {
        name: 'Diazepam',
        cantidad: 3490
      },
      {
        name: 'Adiro',
        cantidad: 3490
      },
      {
        name: 'Amoxicilina',
        cantidad: 3490
      },
    ]
  })
  server.create("stat", {
    stat_type:"topSeller_cities_query",
    topSeller_cities_query:[
      { name: 'Barcelona', value: 400 },
      { name: 'Tarragona', value: 300 },
      { name: 'Girona', value: 300 },
      { name: 'Lleida', value: 200 },
    ]
  })

  server.create("stat", {
    stat_type:"year_orders_query",
    year_orders_query:[
      {
        name: 'Enero',
        maximo: 4000
      },
      {
        name: 'Fabrero',
        maximo: 3000
      },
      {
        name: 'Marzo',
        maximo: 2000
      },
      {
        name: 'Abril',
        maximo: 2780
      },
      {
        name: 'Mayo',
        maximo: 1890
      },
      {
        name: 'Junio',
        maximo: 2390
      },
      {
        name: 'Julio',
        maximo: 3490
      },
      {
        name: 'Septiembre',
        maximo: 3490
      },
      {
        name: 'Octubre',
        maximo: 3490
      },
      {
        name: 'Noviembre',
        maximo: 3490
      },
      {
        name: 'Diciembre',
        maximo: 3490
      },
    ]
  })
  server.create("stat", {
    stat_type:"accounts_stat_query",
    accounts_stat_query:[
      { name: 'Pacientes', value: 2400 },
      { name: 'Médicos', value: 4567 },
      { name: 'Gestores', value: 1398 }
    
    ],
  })
}
export function defineMirageStatsRoutes(server) {
    server.post("/api/stats", (schema, request) => {
      const requestPayload = JSON.parse(request.requestBody)
      console.log("Received request:" + request.requestBody)

      // Check payload
      const expectedFields = [
        "session_token",
      ]
      const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)
      if (!expectedFieldsOk) {
        return {result : 'error_fields'}
      }

      const accounts_stat_query = schema.stats.findBy({stat_type:"accounts_stat_query"})
      const topSeller_cities_query = schema.stats.findBy({stat_type:"topSeller_cities_query"})
      const year_orders_query = schema.stats.findBy({stat_type:"year_orders_query"})
      const topSeller_meds_query = schema.stats.findBy({stat_type:"topSeller_meds_query"})
      const sells_comparation_query = schema.stats.findBy({stat_type:"sells_comparation_query"})
      // Return
      return {
        result: 'ok',
        accounts_stat : accounts_stat_query,
        topSeller_cities: topSeller_cities_query,
        year_orders: year_orders_query,
        topSeller_meds: topSeller_meds_query,
        sells_comparation: sells_comparation_query

      }
    })
}
