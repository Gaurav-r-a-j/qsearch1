import stripeModule from 'stripe';
const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);


const retrievePaymentIntent = async (req, res, next) => {
    const { sessionId } = req.body;
    // console.log(sessionId)

    try {
        // Retrieve the payment intent
        // console.log("here")
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        // console.log(session.payment_status)
        if (session.payment_intent !== null) {
            const paymentIntent = await stripe.paymentIntents.retrieve(
                session.payment_intent
            );
            req.paymentIntent = paymentIntent.status;
            // console.log("this",paymentIntent.status)
        }

        req.paymentStatus = session.payment_status;

        next();
    } catch (error) {
        return res.status(500).send({ error });
    }
};

export default retrievePaymentIntent;
