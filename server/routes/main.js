const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', (req, res) => {
    const locals = {
        title: 'Hote Room Booking',
        description: 'Room Booking Application for CSIT927',
    }

    res.render('index', { locals });
});


router.get('/about', (req, res) => {
    res.render('about');
});

router.post('/add', async (req, res) => {
    const { checkIn, checkOut, noOfGuest } = req.body;

    console.log(checkIn, checkOut, noOfGuest);

    const booking = new Booking({
        checkIn: checkIn,
        checkOut: checkOut,
        noOfGuest: noOfGuest
    });

    try {
        await booking.save();
        console.log('Booking added successfully');
        res.redirect('/#rooms');
    } catch (err) {
        console.log(err);
        res.send('Error adding booking');
    }
});

router.post('/payment', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Hote Room Booking',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
     });

     console.log(session);
     res.redirect(session.url);
})

router.get('/success', (req, res) => {
    res.send('Payment successful!');
});

router.get('/cancel', (req, res) => {
    res.redirect('/');
});

module.exports = router