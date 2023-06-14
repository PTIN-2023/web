const express = require('express');
const stripe = require('stripe')('sk_test_51NFcckFqlmEYPctjLu9BX6Ei7hjTIFCwJwIOdLUrm1vlP9CPs2zNKLTNIdrWlEbvbJSdTI2QtHs9PkFfRcwWkHUv006jzBuVCK');
const app = express();

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const total = 1000; // 10 USD hardcodeado

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd'
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(4000, () => console.log('Stripe server started on port 4000'));
