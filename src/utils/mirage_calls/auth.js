
export function seedMirageAuth(server) {}

export function defineMirageAuthRoutes(server) {
  /* Basic login endpoint
  server.post("/api/login", (schema, request) => {
  console.log("Received login req with:" + request.requestBody)
  return {
      result: 'ok',
      role: 'pacient',
      session_token: '3458764568973496'
  }
  })*/

  server.post("/api/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.email === email);

    if (user && user.password === password) {
      return {
        status: "success",
        message: "Inicio de sesión exitoso",
      };
    } else {
      return new Response(401, {}, { status: "error", message: "Credenciales incorrectas" });
    }
  });

  // Basic register endpoint. TODO: simulate diferent logins depending on the user email
  server.post("/api/register", (schema, request) => {
  console.log("Received register req with:" + request.requestBody)
    return { 
      result : 'ok',
      role : 'pacient',
      session_token : '7456394693456'
    }
  })

  server.post("/api/google", (schema, request) => {
    console.log("Received register req with:" + request.requestBody)

    return { 
      result : 'ok',
      role : 'patient',
      email : request.requestBody.email,
      fullName : request.requestBody.name,
      picture: request.requestBody.picture,
      session_token : 'googleToken'
    }
  })
}