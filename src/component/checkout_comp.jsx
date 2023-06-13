import React, { useState } from 'react';

const CheckoutForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (paymentMethod === 'paypal') {
            const response = await fetch('http://localhost:5000/api_paypal', { method: 'POST' });
            const data = await response.json();
        
            if (response.ok) {
                // Redirige al usuario a la página de PayPal para completar la compra
                window.location.href = data.approveUrl;
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
