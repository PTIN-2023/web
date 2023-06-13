const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config()

// Habilita todas las solicitudes CORS
app.use(cors());

// Configura tu entorno de PayPal
let environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);
let client = new paypal.core.PayPalHttpClient(environment);

app.post('/api_paypal', async (req, res) => {
    // Crea una nueva orden de PayPal
    let request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '10.00' // Aquí puedes poner el monto que desees
            }
        }]
    });

    try {
        // Envía la solicitud a PayPal
        let response = await client.execute(request);

        // Si la solicitud es exitosa, devuelve la URL de aprobación
        if (response.statusCode === 201) {
            let approveUrl = response.result.links.find(link => link.rel === 'approve').href;
            res.json({ approveUrl });
        } else {
            res.json({ error: 'Error al crear la orden de PayPal' });
        }
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.get('/', function (req, res) {
    res.send('Hola Mundo!');
});

app.listen(5000, () => console.log('Server running on port 5000'));
