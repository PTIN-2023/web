
//  Faltaria hacer más robusto el sistema implementando metodos para comprovar si
//  los datos nuevos que no se puedan repetir, no corresponden con los de ningun 
//  otro cliente y si son validos (por ejemplo que la contraseña no sea "123").
//
//  Tambien hay que gestionar que pasaria si cambian el email, ya que la manera en 
//  la que se encuentra al usuario, es el email. Se podria implementar un identificador 
//  "id" de cliente que no pueda cambiar ni repetirse con ningun otro cliente.

// Funcion que inicializa dos clientes simulados
export function seedMirageUserInf(server) {
    server.create("user", {
        user_name: "John doe",
        user_age: "32",
        user_pseudoname: "John",
        user_email: "ejemplo@gmail.com",
        user_password: "john",
        user_phone: "66472899",
        user_city: "Narnia",
        user_address: "Coolstown st. nº 3",
        user_test_token: "test"      
    })
    server.create("user", {
        user_name: "PWEV",
        user_age: "33",
        user_pseudoname: "WCW",
        user_email: "WCWWC@gmail.com",
        user_password: "WCE",
        user_phone: "66472899",
        user_city: "NaWCECWrnia",
        user_address: "CEWWECWCWEC st. nº 3",
        user_test_token: "test"
    })
}

// Ruta para poder gestionar las peticiones de la pagina de perfil
export function defineMirageProfileRoutes(server) {

    // Metodo para enviar los datos del cliente y poder rellenar los campos del perfil
    server.post("/api/user_info", (schema, request) => {
        const queryParams = request.queryParams;
        const user = schema.users.findBy({ user_name: queryParams.user_test_token });

        // Si ningun usuario corresponde con el email que hemos recibido
        if (!user) {
            return ({
                usuario: queryParams.user_test_token,
                result: "error",
                description: "User not found"
            });
        }

        // Si tenemos el usuario, enviamos "ok" y los datos correspondientes en el orden que se muesra abajo
        return {
            result: "ok",
            user: {
                name: user.user_name,
                age: user.user_age,
                pseudoname: user.user_pseudoname,
                email: user.user_email,
                passwd: user.user_password,
                phone: user.user_phone,
                city: user.user_city,
                addres: user.user_address
            }
        };
    });

    // Metodo para gestionar si un cliente cambia algun dato de su perfil
    server.post("/api/user_modifyInfo", (schema, request) => {
        const requestPayload = JSON.parse(request.requestBody)
        const queryParams = request.queryParams;
        const user = schema.users.findBy({ user_name: queryParams.user_test_token });

        // Si ningun usuario corresponde con el email que hemos recibido
        if (!user) {
            return ({
                result: "error",
                description: "No se ha guardado el cambio"
            })
        }

        user.update({
            user_pseudoname: requestPayload.pseudoname,
            user_email: requestPayload.email,
            user_password: requestPayload.passwd,
            user_phone: requestPayload.phone,
            user_city: requestPayload.city,
            user_address: requestPayload.addres
        });

        return { result: "ok" };
    });
}