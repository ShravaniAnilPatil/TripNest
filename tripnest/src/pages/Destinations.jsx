import { useState } from "react";

// Import images
import beach1 from "../assets/beach1.jpeg";
import beach2 from "../assets/beach2.jpeg";
import mountain1 from "../assets/mountain1.jpeg";
import mountain2 from "../assets/mountain2.jpeg";
import city1 from "../assets/city1.jpeg";
import city2 from "../assets/city2.jpeg";

const Destinations = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [bookingDest, setBookingDest] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: "",
    transport: "Flight",
    hotel: "",
  });

  const destinations = [
    { title: "Bali Beach", type: "Beach", image: beach1 },
    { title: "Malibu Beach", type: "Beach", image: beach2 },
    { title: "Swiss Alps", type: "Mountain", image: mountain1 },
    { title: "Rocky Mountains", type: "Mountain", image: mountain2 },
    { title: "Paris", type: "City", image: city1 },
    { title: "London", type: "City", image: city2 },
  ];

  // Filter by type and search
  const filteredDestinations = destinations.filter((dest) => {
    const matchType = filter === "All" || dest.type === filter;
    const matchSearch = dest.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(
      `Trip booked for ${bookingDest.title}!\nDate: ${bookingData.date}\nTransport: ${bookingData.transport}\nHotel: ${bookingData.hotel}`
    );
    setBookingDest(null); // close modal
    setBookingData({ date: "", transport: "Flight", hotel: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Explore Destinations
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Beach", "Mountain", "City"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === type
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredDestinations.map((dest, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transform transition"
          >
            <img
              src={dest.image}
              alt={dest.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{dest.title}</h3>
              <p className="text-gray-500">{dest.type}</p>
              <button
                onClick={() => setBookingDest(dest)}
                className="mt-2 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Book Trip
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingDest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setBookingDest(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              Book Trip: {bookingDest.title}
            </h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Mode of Transport</label>
                <select
                  value={bookingData.transport}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, transport: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Flight</option>
                  <option>Train</option>
                  <option>Bus</option>
                  <option>Car</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Hotel</label>
                <input
                  type="text"
                  placeholder="Hotel Name"
                  value={bookingData.hotel}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, hotel: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;
