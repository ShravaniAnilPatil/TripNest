import React, { useState } from "react";

export default function TripForm() {
  const [form, setForm] = useState({
    type: "",
    budget: "",
    activities: "",
    climate: "",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          budget: Number(form.budget),
          activities: form.activities
            .split("|")
            .map((a) => a.trim().toLowerCase()),
          climate: form.climate.toLowerCase(),
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setRecommendations(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleReset = () => {
    setForm({ type: "", budget: "", activities: "", climate: "" });
    setRecommendations([]);
    setSubmitted(false);
  };

  // Background image styling
  const backgroundStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={backgroundStyle} className="min-h-screen">
      <div className="bg-black/50 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/30 transition-all duration-500">
          {!submitted ? (
            <div className="space-y-5">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                🌍 TripNova Recommendations
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="type"
                  placeholder="Type (Beach, Mountain, etc.)"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-500"
                  required
                />
                <input
                  name="budget"
                  type="number"
                  placeholder="Budget (e.g., 5000)"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-500"
                  required
                />
                <input
                  name="activities"
                  placeholder="Activities (trekking|hiking)"
                  value={form.activities}
                  onChange={handleChange}
                  className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-500"
                  required
                />
                <input
                  name="climate"
                  placeholder="Climate (cold, tropical)"
                  value={form.climate}
                  onChange={handleChange}
                  className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-500"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition-transform duration-300 hover:scale-[1.01]"
                >
                  Get Recommendations
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-5">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                🌎 Your Top Destinations
              </h1>

              {/* Transparent container for grid */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-inner border border-white/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-md border-l-4 border-indigo-500 hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      <h2 className="text-lg font-semibold text-indigo-700 mb-1">
                        {rec.country}
                      </h2>
                      
                      <p className="text-sm text-gray-600">
                        <strong>Budget:</strong>{" "}
                        <span className="font-bold text-green-600">
                          ₹{rec.budget}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Activities:</strong>{" "}
                        <span className="italic">{rec.activities}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Rating:</strong>{" "}
                        <span className="font-bold text-yellow-600">
                          {rec.rating} ⭐
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="py-2 px-6 text-sm font-medium text-white bg-green-500 rounded-xl shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-transform hover:scale-[1.01]"
                >
                  🔁 Plan Another Trip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
