const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  const { hotelName, from, to, customerName } = req.body;
  try {
    const newBooking = new Booking({
      hotelName,
      from,
      to,
      customerName,
    });
    const booking = await newBooking.save();
    res.json(booking);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};
