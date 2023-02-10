import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import printOrderRoutes from './routes/printOrder.js';
import userRoutes from './routes/user.js';
import stripeModule from 'stripe';



// import formDataParser from './dataParser.js';
// Use the form data parser middleware in your routes
// import parseMp from 'express-parse-multipart'

const app = express();
dotenv.config();
app.use(cors());

// app.use(formDataParser);


// making middlewares for routes
// Enable CORS and body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());// this is to allow getting incoming json file
// var upload = multer();


const port = process.env.PORT || 5500;




// console.log("FIRST", process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});


// Include the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/order', printOrderRoutes);
app.use('/api/user', userRoutes);



//stripe payment gateway
const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
    const { amount, paymentMethodType } = req.body;

    try {
        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            // "automatic_payment_methods[enabled]": true,
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: 'Print order',
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // success_url: 'http://localhost:3001/success',
            // cancel_url: 'http://localhost:30001/cancel',
            success_url: process.env.CLIENT_URL + 'order' + "?success=true",
            cancel_url: process.env.CLIENT_URL + 'order' +"?success=false",
        });

        // const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        console.log(session)
        // console.log(session)

        // Send the checkout session ID to the client
        res.send({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
});






// app.post('/api/payments', async (req, res) => {
//     console.log(req.body)
//     const { amount, paymentMethodType } = req.body;

//     try {
//         // Create a payment method using the Stripe library
//         const paymentMethod = await stripe.paymentMethods.create({
//             type: paymentMethodType,
//             card: {
//                 number: '4242 4242 4242 4242',
//                 exp_month: 12,
//                 exp_year: 2025,
//                 cvc: '123'
//             }
//         });

//         // Use the payment method's ID to create the PaymentIntent
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: 'INR',
//             payment_method: paymentMethod.id,
//             confirmation_method: 'manual',
//             confirm: true
//         });

//         res.send({ paymentIntent });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error });
//     }
// });




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


