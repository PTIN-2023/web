
export function seedMirageAuth(server) {
  server.create("user", {
    user_full_name: "John doe",
    user_given_name: "John",
    user_email: "jondoe@example.com",
    user_city: "Narnia",
    user_address: "Coolstown st. nº 3",
    user_password: "john",
    user_picture : "https://picsum.photos/200",
    user_role : 'manager'
  })
  server.create("user", {
    user_full_name: "John doe2",
    user_given_name: "John2",
    user_email: "jondoe2@example.com",
    user_city: "Narnia",
    user_address: "Coolstown st. nº 3",
    user_password: "john2",
    user_picture : "https://picsum.photos/200",
    user_role : 'doctor'
  })
}

export function defineMirageAuthRoutes(server) {
  // Username+password register endpoint
  server.post("/api/register", (schema, request) => {
    const expectedFields = [
      "user_full_name", 
      "user_given_name", 
      "user_email", 
      "user_phone",
      "user_city", 
      "user_address", 
      "user_password"
    ]
    const requestPayload = JSON.parse(request.requestBody)
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    if (schema.users.findBy({ user_email : requestPayload.user_email })) {
      return ({
        result : "error",
        description: "Email already exists"
      })
    }
    
    if (schema.users.findBy({ user_given_name : requestPayload.user_given_name })) {
      return ({
        result : "error",
        description: "Given name already exists"
      })
    }

    schema.db.users.insert({
      user_full_name: requestPayload.user_full_name,
      user_given_name: requestPayload.user_given_name,
      user_email: requestPayload.user_email,
      user_city: requestPayload.user_city,
      user_address: requestPayload.user_address,
      user_password: requestPayload.user_password,
      user_picture : ''
    })

    return { 
      result : 'ok',
      role : 'pacient',
      session_token : requestPayload.user_email
    }
  })

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

function hasExpectedFields(object, expectedFields) {
  var hasAllFields = true

  expectedFields.forEach(field =>
    hasAllFields = hasAllFields && object.hasOwnProperty(field)
  )

  return hasAllFields
}