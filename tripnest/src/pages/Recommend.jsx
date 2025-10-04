import React, { useState } from "react";
import "./Recommend.css"; // Add this line

export default function TripForm() {
  const [form, setForm] = useState({
    type: "",
    budget: "",
    activities: "",
    climate: ""
  });
  const [recommendations, setRecommendations] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: form.type,
        budget: Number(form.budget),
        activities: form.activities.split("|").map((a) => a.trim().toLowerCase()),
        climate: form.climate.toLowerCase()
      })
    });
    const data = await response.json();
    setRecommendations(data);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ type: "", budget: "", activities: "", climate: "" });
    setRecommendations([]);
    setSubmitted(false);
  };

  return (
    <div className="tripnova-bg">
      <div className="overlay">
        {!submitted ? (
          <div className="form-container">
            <h1 className="title">🌍 TripNova Recommendations</h1>
            <form onSubmit={handleSubmit} className="recommend-form">
              <input
                name="type"
                placeholder="Type (Beach, Mountain, etc.)"
                value={form.type}
                onChange={handleChange}
              />
              <input
                name="budget"
                placeholder="Budget"
                value={form.budget}
                onChange={handleChange}
              />
              <input
                name="activities"
                placeholder="Activities (trekking|hiking)"
                value={form.activities}
                onChange={handleChange}
              />
              <input
                name="climate"
                placeholder="Climate (cold, tropical)"
                value={form.climate}
                onChange={handleChange}
              />
              <button type="submit" className="btn-submit">
                Get Recommendations
              </button>
            </form>
          </div>
        ) : (
          <div className="results-container">
            <h1 className="title">🌎 Your Top Destinations</h1>
            <ul className="results-list">
              {recommendations.map((rec, index) => (
                <li key={index} className="result-card">
                  <h2>{rec.name}</h2>
                  <p><strong>Country:</strong> {rec.country}</p>
                  <p><strong>Budget:</strong> {rec.budget}</p>
                  <p><strong>Activities:</strong> {rec.activities}</p>
                  <p><strong>Rating:</strong> {rec.rating}</p>
                </li>
              ))}
            </ul>
            <button onClick={handleReset} className="btn-reset">
              🔁 Plan Another Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
