import hasExpectedFields from '../hasExpectedFields'

export function seedMirageInventoryMeds(server) {
    for (let i = 1; i < 10; i++) {
        server.create("storedmedicine", {
            medicine_identifier: '0fghdfh'+i,
            medicine_image_url: 'https://picsum.photos/200',
            medicine_name: 'Ibuprofeno',
            excipient: 'Sorbitol (E-420)',
            pvp: 4,
            contents: '30 comprimidos',
            prescription_needed: false,
            form: 'pill',
            type_of_administration: 'oral',
            quantity_available: 10*i,
            amount_sold: 12*i
          })
          server.create("storedmedicine", {
            medicine_identifier: '1fgdhgfd'+i,
            medicine_image_url: 'https://picsum.photos/200',
            medicine_name: 'medicine1',
            excipient: 'excipient1',
            pvp: '1',
            contents: 'contents1',
            prescription_needed: true,
            form: 'cream',
            type_of_administration: 'topical',
            quantity_available: 32*i,
            amount_sold: 10*i
          })
          server.create("storedmedicine", {
            medicine_identifier: '2fdghj'+i,
            medicine_image_url: 'https://picsum.photos/200',
            medicine_name: 'medicine2',
            excipient: 'excipient2',
            pvp: '2',
            contents: 'contents2',
            prescription_needed: true,
            form: 'powder',
            type_of_administration: 'inhalation',
            quantity_available: 412*i,
            amount_sold: 61*i
          })
          server.create("storedmedicine", {
            medicine_identifier: '3hgffgdh'+i,
            medicine_image_url: 'https://picsum.photos/200',
            medicine_name: 'medicine3',
            excipient: 'excipient3',
            pvp: '3',
            contents: 'contents3',
            prescription_needed: false,
            form: 'liquid',
            type_of_administration: 'ophthalmic',
            quantity_available: 3011*i,
            amount_sold: 4114*i
          })
    }
}

export function defineInventoryMedsRoutes(server) {
  server.post("/api/list_inventory_meds_num", (schema, request) => {
    console.log("Received list available medicines req with:" + request.requestBody)
    const requestPayload = JSON.parse(request.requestBody)
    const entriesNum = schema.storedmedicines.all().models.length

    return {
      result: 'ok',
      num_pages: Math.ceil(entriesNum / requestPayload.orders_per_page)
    }
  })

  server.post("/api/list_inventory_meds", (schema, request) => {
    console.log("Received list available medicines req with:" + request.requestBody)
    const requestPayload = JSON.parse(request.requestBody)

    const start = requestPayload.entries_per_page * (requestPayload.page - 1)
    const end = start + requestPayload.entries_per_page
    console.log(start, end)
    const entries = schema.storedmedicines.all().models.slice(start, end)

    return {
      result: 'ok',
      inventario : entries
    }
  })
}