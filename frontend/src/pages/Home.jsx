import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../assets/imgs/img1.png";
import img2 from "../assets/imgs/img2.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [Hotels, setHotels] = useState([]);
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.log("Error fetching hotels:", error);
    }
  };

  return (
    <>
    <Header/>
       <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={img1}></img>
          <Carousel.Caption>
            <h3>Welcome to Hotel Booking System</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img2}></img>
          <Carousel.Caption>
          <h3>Welcome to Hotel Booking System</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img1}></img>
          <Carousel.Caption>
          <h3>Welcome to Hotel Booking System</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="bg-gray-100 py-8 px-4">
        {/* Subheading */}
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-8">
          Available Hotels
        </h2>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {Hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-80"
            >
              {/* Hotel Image */}
              <img
                src={`http://localhost:5000/uploads/${hotel.hotelImage}`}
                alt={hotel.hotelImage}
                className="w-full h-48 object-cover"
              />
              {/* Hotel Name */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {hotel.hotelName}
                </h3>
              </div>
            </div>
          ))}
        </div>

       
        {/*<div className="flex justify-center mt-10">
          <a
            href="/bookingForm"
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Book a Hotel
          </a>
        </div>*/}
      </div>
      <Footer/>
    </>
  );
};

export default Home;
