import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

// Pages
import Destinations from "./pages/Destinations";
import Login from "./pages/Login1";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";

function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/recommend" element={<Recommend />} />
         <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
