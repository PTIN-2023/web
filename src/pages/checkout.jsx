import React, { useState } from 'react';

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, como conectarte a tu API y hacer el pago.
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
            <label className="block text-gray-700">Numero de la tarjerta:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
              className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Fecha de caducidad:</label>
              <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)}
                className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">CVV:</label>
              <input type="text" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)}
                className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500" />
            </div>
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
