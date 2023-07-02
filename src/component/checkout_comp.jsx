import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';



function App() {
    return (
        <Router>
            <Route path="/checkout" component={SuccessPage} />
            <Route path="/checkout" component={CancelPage} />
            <Route path="/checkout" component={CheckoutForm} />
        </Router>
    );
}

// ...

function SuccessPage() {
    // Aquí puedes manejar la lógica después de que el usuario haya completado el pago
    return <h1>Pago exitoso!</h1>;
}

function CancelPage() {
    // Aquí puedes manejar la lógica después de que el usuario haya cancelado el pago
    return <h1>Pago cancelado.</h1>;
}



const CheckoutForm = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false); // Nuevo estado para rastrear el éxito del pago

    useEffect(() => {
        if (paymentSuccess) {
            setTimeout(() => {
                window.location.href = "/myorders";
            }, 10000);
        }
    }, [paymentSuccess]);

    // En tu componente CheckoutForm...
    useEffect(() => {
        // Obtén el ID de la orden desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const orderID = urlParams.get('token');

        if (orderID) {
            // Haz una solicitud POST a tu endpoint de captura
            fetch('http://localhost:5000/api_paypal/capture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderID })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // El pago fue exitoso
                        console.log('Pago exitoso!');
                        setPaymentSuccess(true);
                    } else {
                        // Hubo un error al capturar el pago
                        console.error('Error al capturar el pago:', data.error);
                    }
                })
                .catch(err => console.error('Error al hacer la solicitud de captura:', err));
        }
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api_paypal', { method: 'POST' });
        const data = await response.json();

        if (response.ok) {
            // Redirige al usuario a la página de PayPal para completar la compra
            window.location.href = data.approveUrl;
            window.onbeforeunload = function () {
                // Aquí puedes manejar la lógica después de que la página se haya recargado
                // Por ejemplo, puedes redirigir al usuario a una página de éxito o de fracaso
            }
        } else {
            console.error('Error al crear la orden de PayPal:', data.error);
        }
    };

    if (paymentSuccess) {
        return (
            <div className="max-w-lg mx-auto mt-10 bg-white p-10 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-5">Checkout</h2>
                <p>Su compra se ha realizado correctamente, gracias por confiar en nosotros.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 bg-white p-10 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-5">Checkout</h2>

            <button type="submit" style={{
                backgroundColor: "#ffc439",
                color: "#253b80",
                border: "1px solid #253b80",
                borderRadius: "4px",
                padding: "10px 20px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer"
            }}>
                <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="Buy Now" />
                Pagar con PayPal
            </button>

        </form>
    );
}

export default CheckoutForm;