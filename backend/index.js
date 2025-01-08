require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const path = require('path');
const RunServer= require('./database/connection');
const BookingRouter = require('./routes/BookingRoutes');
const HotelRouter = require('./routes/HotelRoutes');
const adminRouter = require('./routes/admin');

const app=express();
const port=process.env.PORT;


app.use(express.json());
app.use(cors());

//app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  //serve static files



RunServer();

app.use('/api/bookings', BookingRouter);

app.use('/api/hotels', HotelRouter);

app.use('/api/admin', adminRouter);

app.listen(port, ()=>{
    console.log(`server is running on ${port} port`)
})