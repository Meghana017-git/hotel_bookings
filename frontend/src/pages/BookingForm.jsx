import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingForm = () => {
  const [hotelName, setHotelName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [hotels, setHotels] = useState([]);

  // Fetch hotels when component mounts
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/hotels`);
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!hotelName || !from || !to || !customerName) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Convert dates to proper Date objects
    const bookingData = {
      hotelName,
      from: new Date(from), // Ensure from is a Date object
      to: new Date(to), // Ensure to is a Date object
      customerName,
    };
  
    try {
      // Send a POST request to the API to create a booking
      const response = await axios.post(`${process.env.BACKEND_URL}/bookings`, bookingData);
      console.log("Booking submitted:", response.data);
  
      // Clear form
      setHotelName("");
      setFrom("");
      setTo("");
      setCustomerName("");
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2,'0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayDate = getTodayDate();
  
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-red-900 mb-6">Hotel Booking Form</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hotelName" className="block text-gray-700 font-medium mb-1">Hotel Name</label>
          <select
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select a hotel</option>
            {hotels.map((hotel,index) => (
              <option key={index} value={hotel.hotelName}>
                {hotel.hotelName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="from" className="block text-gray-700 font-medium mb-1">From</label>
          <input
            type="date"
            value={from}
            min={todayDate}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label htmlFor="to" className="block text-gray-700 font-medium mb-1">To</label>
          <input
            type="date"
            value={to}
            min={from || todayDate}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label htmlFor="customerName" className="block text-gray-700 font-medium mb-1">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
