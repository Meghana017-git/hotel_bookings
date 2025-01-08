const express = require('express')
const multer = require("multer");
const path = require('path');
const { getAllHotels, addHotel, deleteHotel } = require('../controllers/HotelCtrl');

const HotelRouter = express.Router();


// set up multer for file Uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),  //use absolute path
    filename: (req, file, cb) => {
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});


const upload = multer({
    storage,
    limits: { fileSize: 1000000 },   //limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file,cb);
    },
});

function checkFileType(file, cb) {
    //Allowed file types
    const filetypes = /jpeg|jpg|png/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    //for ex, a MIME type can specify whether a file is an image, video, text, document etc.
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('error: Images only');
    }
}

HotelRouter.get('/', getAllHotels);

HotelRouter.post('/', upload.single('hotelImage'), addHotel);

HotelRouter.delete('/:id', deleteHotel);


module.exports = HotelRouter;