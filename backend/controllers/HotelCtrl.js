const Hotel = require("../models/hotel");
const path = require("path");
const fs = require("fs");

// Function to get all hotels
exports.getAllHotels = async(req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Function to add a new hotels

exports.addHotel = async(req, res) => {
  const { hotelName } = req.body;
  const hotelImage = req.file ? req.file.filename : '';
  try {
    const newHotel = new Hotel({
      hotelName,
      hotelImage,
    });
    const hotel = await newHotel.save();
    res.json(hotel);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};

//Function to delete a hotel

exports.deleteHotel = async(req, res) => {
  try {
    console.log(`Attempting to delete hotel with id:${req.params.id}`);
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      console.log("Hotel not Found");
      return res.status(400).json({ msg: "Hotel not Found " });
    }
    if (hotel.hotelImage) {
      try {
        const imagePath = path.join(
          __dirname,
          "..",
          "uploads",
          hotel.hotelImage
        );
        console.log(`Deleting Image: ${imagePath}`);
        fs.unlinkSync(imagePath);
        console.log(`Image ${hotel.hotelImage} deleted successfully`);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log(`Image ${hotel.hotelImage} not found, skipping deletion`);
        } else {
          console.log(`Error deleting image ${hotel.hotelImage}:`, err.message);
          return res.status(500).json({ msg: "Error deleting image" });
        }
      }
    }
    await Hotel.deleteOne({ _id: req.params.id });
    console.log(`Hotel with id: ${req.params.id} deleted successfully`);
    res.json({ msg: "Hotel removed " });
  } catch (err) {
    console.error("error removing details :", err.message);
    res.status(500).send("server error");
  }
};
