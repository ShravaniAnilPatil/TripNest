import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import Features from "./components/Features";

import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <HeroCarousel />
      <Features />
      <div className="text-center mt-10 mb-16">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default App;
