const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName:{
        type:String,
        required:true,
        unique: true,
    },
    hotelImage:{
        type:String,
        required:true,
    }
})

const hotel = mongoose.model('hotel', hotelSchema);
module.exports = hotel;


