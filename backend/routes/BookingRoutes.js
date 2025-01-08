
const express = require('express');
const { createBooking } = require('../controllers/BookingCtrl');



const BookingRouter = express.Router();

BookingRouter.post('/', createBooking);


module.exports = BookingRouter;