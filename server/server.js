import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import stripe from 'stripe';


const app = express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));


const stripeSecretKey = 'sk_test_51OHBV8LSDNr76QZAFNquturSKpQIEKy0amyvRFpwTBxY4lhsFWIUKbapsGBA1OIvJJsfVGcs57GoZLxS8FgAyWDs00cPJ2j9eK';
const stripeInstance = stripe(stripeSecretKey);

app.post('/checkout', async (req, res, next) => {
    try {
        const session = await stripeInstance.checkout.sessions.create({
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.product],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:4242/success',
            cancel_url: 'http://localhost:4242/cancel',
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        next(error);
    }
});

app.listen(4242, () => console.log('Running on port 4242'));

