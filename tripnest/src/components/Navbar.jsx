import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Import Link

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-bold text-blue-700">
          TripNest 🌍
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/features" className="hover:text-blue-500">Features</Link>
          <Link to="/recommend" className="hover:text-blue-500">SmartGuide</Link>
          <Link to="/destinations" className="hover:text-blue-500">Destinations</Link>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden bg-white shadow-lg flex flex-col p-5 gap-4"
        >
          <Link to="/" onClick={() => setNavOpen(false)}>Home</Link>
          <Link to="/features" onClick={() => setNavOpen(false)}>Features</Link>
          <Link to="/destinations" onClick={() => setNavOpen(false)}>Destinations</Link>
          <Link to="/contact" onClick={() => setNavOpen(false)}>Contact</Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
