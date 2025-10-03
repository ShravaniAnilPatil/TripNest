import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-bold text-blue-700">TripNest 🌍</h1>

        <div className="hidden md:flex gap-8 text-lg">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#features" className="hover:text-blue-500">Features</a>
          <a href="#destinations" className="hover:text-blue-500">Destinations</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>
        </div>

        <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {navOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden bg-white shadow-lg flex flex-col p-5 gap-4"
        >
          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#destinations">Destinations</a>
          <a href="#contact">Contact</a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
