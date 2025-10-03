import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h1 className="text-3xl font-bold mb-4">TripNest 🌍</h1>
          <p className="text-gray-200">
            Explore the world, plan your trips, and make memories with TripNest.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-yellow-300 transition">Features</a></li>
            <li><a href="#destinations" className="hover:text-yellow-300 transition">Destinations</a></li>
            <li><a href="#contact" className="hover:text-yellow-300 transition">Contact</a></li>
            <li><a href="#login" className="hover:text-yellow-300 transition">Login</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-300 transition">Paris</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Tokyo</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">New York</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Sydney</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
          <p className="text-gray-200 mb-4">Get travel tips and updates straight to your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-lg text-black w-full focus:outline-none"
            />
            <button className="bg-yellow-400 text-black px-4 rounded-r-lg font-semibold hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-yellow-300 transition"><Facebook size={24} /></a>
            <a href="#" className="hover:text-yellow-300 transition"><Instagram size={24} /></a>
            <a href="#" className="hover:text-yellow-300 transition"><Twitter size={24} /></a>
            <a href="#" className="hover:text-yellow-300 transition"><Linkedin size={24} /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-gray-300">
        &copy; {new Date().getFullYear()} TripNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
