const express = require('express');
const booking = require('../models/booking');
const adminRouter = express.Router();

adminRouter.get('/bookings', async(req,res) => {
    try {
        const bookings =await booking.find();
        res.json(bookings);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = adminRouter;