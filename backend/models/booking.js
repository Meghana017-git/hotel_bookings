const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    hotelName:{
        type:String, 
        required: true,
    },
    from:{
        type:Date, 
        required: true,
    },
    to:{
        type:Date, 
        required: true,
    },
    customerName:{
        type:String, 
        required: true,
    }
})

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;