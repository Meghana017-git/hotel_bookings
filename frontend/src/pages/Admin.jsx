import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [bookings, setbookings] = useState([]);
  const [hotelName, sethotelName] = useState([]);
  const [hotelImage, sethotelImage] = useState(null);
  const [Hotels, setHotels] = useState([]);
  
  useEffect(() => {
    fetchBookings();
    fetchHotels();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/bookings"
      );
      setbookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelImage", hotelImage);
   
    try {
      await axios.post("http://localhost:5000/api/hotels", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          //The POST request sends the FormData object to the server. since this data includes a file
          // it must be encoded as multipart/form-data
        },
      });
      fetchHotels();
      sethotelName('');
      sethotelImage(null);
    } catch (error) {
        console.error("Error adding hotels:", error.response ? error.response.data : error.message);
      }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${id}`);
      fetchHotels();
    } catch (error) {
      console.error(
        "Error deleting hotels:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
  {/* Booking Details */}
  <h1 className="text-3xl font-bold text-red-600 mb-4">Booking Details</h1>
  <table className="w-full table-auto border-collapse border border-gray-300 mb-8">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2 text-left">Hotel Name</th>
        <th className="border border-gray-300 px-4 py-2 text-left">From</th>
        <th className="border border-gray-300 px-4 py-2 text-left">To</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking, index) => (
        <tr
          key={index}
          className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
        >
          <td className="border border-gray-300 px-4 py-2">
            {booking.hotelName}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            {new Date(booking.from).toLocaleDateString()}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            {new Date(booking.to).toLocaleDateString()}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            {booking.customerName}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Manage Hotels */}
  <h1 className="text-3xl font-bold text-red-600 mb-4">Manage Hotels</h1>
  <form
    onSubmit={handleHotelSubmit}
    className="bg-white p-6 shadow-md rounded-md mb-8"
  >
    <div className="mb-4">
      <label
        htmlFor="hotelName"
        className="block text-gray-700 font-medium mb-2"
      >
        Hotel Name:
      </label>
      <input
        type="text"
        id="hotelName"
        value={hotelName}
        onChange={(e) => sethotelName(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="hotelImage"
        className="block text-gray-700 font-medium mb-2"
      >
        Hotel Image:
      </label>
      <input
        type="file"
        id="hotelImage"
        onChange={(e) => sethotelImage(e.target.files[0])}
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Add Hotel
    </button>
  </form>

  {/* Hotel List */}
  <h2 className="text-3xl font-bold text-red-600 mb-4">Hotel List</h2>
  <ul className="space-y-4">
    {Hotels.map((hotel, index) => (
      <li
        key={index}
        className="flex items-center space-x-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white"
      >
        {/* Hotel Image */}
        <img
          src={`http://localhost:5000/uploads/${hotel.hotelImage}`}
          alt={hotel.hotelName}
          className="w-32 h-32 object-cover rounded-md border border-gray-200"
        />
        <div className="flex-1">
          {/* Hotel Name */}
          <h3 className="text-lg font-bold text-gray-800">
            {hotel.hotelName}
          </h3>
          <button
            onClick={() => handleDelete(hotel._id)}
            className="mt-2 text-red-500 hover:text-red-700 underline"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Admin;
