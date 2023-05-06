// TODO move defined calls to its apropiate files

import inventario_json from '../../../public/inventario.json'

export function seedMirageMisc(server) {}

export function defineMirageMiscRoutes(server) {
  // Basic medicine list endpoint. TODO: simulate filters
  server.post("/api/medicines_list", (schema, request) => {
    console.log("Received medicine list req with:" + request.requestBody)

    return {
      result: 'ok',
      inventario_json
    }
  })

  server.post('/api/users', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);

    const newUser = schema.users.create(attrs);
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(newUser.attrs);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    return newUser;
  });

  server.get('/api/users', (schema, request) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    return storedUsers;
  });

  // Basic medicine list endpoint. TODO: simulate filters
  server.post("/api/medicines_list", (schema, request) => {
    console.log("Received medicine list req with:" + request.requestBody)

    return {
      result: 'ok',
      inventario_json
    }
  })    

  server.get("/api/meds", () => {
    return {
      meds: [
        { id:1, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "30 comprimidos 4,68$", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
        detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
        { id:2, name: "Ibuprofeno", act_exc: "Ibuprofeno/Sorbitol(E-420)", pvp: "30 comprimidos 4,68$", dosis: "1 comprimido (600 mg) cada 6 a 8 horas",
        detalles: "Pedido con receta", precio: "4.68", fomra: "solido", via: "oral", page: 1 },
      ],
    }
  })
}