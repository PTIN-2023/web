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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [paymentSuccess, setPaymentSuccess] = useState(false); // Nuevo estado para rastrear el éxito del pago

    useEffect(() => {
        setTimeout(() => {
            window.location.href = "/makeorder";
        }, 10000);
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

        if (paymentMethod === 'paypal') {
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
        } else {

            if (!stripe || !elements) {
                console.log('Stripe.js has not yet loaded.');
                return;
            }

            const cardElement = elements.getElement(CardElement);

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('[error]', error);
            } else {
                console.log('[PaymentMethod]', paymentMethod);
                try {
                    const response = await fetch('/create-payment-intent', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            paymentMethodId: paymentMethod.id
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const paymentIntent = await response.json();
                    console.log('[PaymentIntent]', paymentIntent);
                } catch (e) {
                    console.log('There was an error when trying to create a payment intent:', e);
                }
            }
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

            {/* ...repeat for each input... */}

            <div className="mb-4">
                <span className="block text-gray-700">Método de pago:</span>
                <div className="mt-2">
                    <label className="inline-flex items-center mr-4">
                        <input type="radio" className="form-radio text-blue-500"
                            value="creditCard" checked={paymentMethod === 'creditCard'}
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                        <span className="ml-2">Tarjeta de crédito</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input type="radio" className="form-radio text-blue-500"
                            value="paypal" checked={paymentMethod === 'paypal'}
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                        <span className="ml-2">PayPal</span>
                    </label>
                </div>
            </div>

            {paymentMethod === 'creditCard' && (
                <>
                    {/* ...your credit card fields here... */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre del titular:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Detalles de la tarjeta:</label>
                    </div>
                    {/* ...more credit card fields if needed... */}
                </>
            )}

            {paymentMethod === 'paypal' && (
                <>
                    {/* ...your PayPal fields here, if needed... */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email de PayPal:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500" />
                    </div>
                </>
            )}

            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Pagar
            </button>
        </form>
    );
}

export default CheckoutForm;