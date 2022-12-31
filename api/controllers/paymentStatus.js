
app.post('/api/success', async (req, res) => {
    try {
        // Get the checkout session ID from the request body
        const sessionId = req.body.sessionId;

        // Retrieve the checkout session using the Stripe API
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if the payment was successful
        if (session.payment_status === 'paid') {
            // Payment was successful
            // Update the status of the relevant print order
            const result = await updateOrder(session.metadata.orderId, { isPaid: true });
            res.send({ result });
        } else {
            // Payment failed
            res.status(500).send({ error: 'Payment failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
});

app.post('/api/cancel', async (req, res) => {
    try {
        // Get the checkout session ID from the request body
        const sessionId = req.body.sessionId;

        // Retrieve the checkout session using the Stripe API
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Update the status of the relevant print order
        const result = await updateOrder(session.metadata.orderId, { isPaid: false });
        res.send({ result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
});
