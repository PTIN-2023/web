import { useGoogleLogin } from '@react-oauth/google';

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
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "user_full_name", 
      "user_given_name", 
      "user_email", 
      "user_phone",
      "user_city", 
      "user_address", 
      "user_password"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    // Check validity
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

    // Add user
    schema.db.users.insert({
      user_full_name: requestPayload.user_full_name,
      user_given_name: requestPayload.user_given_name,
      user_email: requestPayload.user_email,
      user_city: requestPayload.user_city,
      user_address: requestPayload.user_address,
      user_password: requestPayload.user_password,
      user_picture : '',
      user_role : 'patient'
    })

    // Return
    return { 
      result : 'ok',
      role : 'pacient',
      session_token : requestPayload.user_email
    }
  })

  // Username+password login endpoint
  server.post("/api/login", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "user_email", 
      "user_password"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    // Check validity
    const user_entry = schema.users.findBy({ user_email : requestPayload.user_email })
    console.log(user_entry)
    if (!user_entry || user_entry.user_password != requestPayload.user_password) {
      return ({
        result : "error",
        description: "Incorrect login"
      })
    }

    // Return
    return { 
      result : 'ok',
      user_given_name : user_entry.user_given_name,
      user_role : user_entry.user_role,
      user_picture : user_entry.user_picture,
      user_token : user_entry.user_email
    }
  })

  // google signin endpoint
  server.post("/api/google", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "user_google_token"
    ]
    console.log(requestPayload)
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    // TODO: use requestPayload.user_google_token to exchange code and update rest of the code

    // Check validity, create user if needed
    if (!schema.users.findBy({ user_email : requestPayload.user_email })) {
      return ({
        result : "error",
        description: "Incorrect login"
      })
    }

    const user_entry = schema.users.findBy({ user_email : requestPayload.user_email })

    // Return
    return { 
      result : 'ok',
      user_given_name : user_entry.user_given_name,
      user_role : user_entry.user_role,
      user_picture : user_entry.user_picture,
      user_token : user_entry.user_email
    }
  })

  // Check token api endpoint
  server.post("/api/checktoken", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "token"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    const user_entry = schema.users.findBy({ user_email : requestPayload.token })
    if (user_entry) {
      return ({
        valid : "yes",
        type: user_entry.user_role
      })
    } else {
      return ({
        valid : "no"
      })
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