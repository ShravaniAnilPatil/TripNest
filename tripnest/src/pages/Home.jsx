import HeroCarousel from "../components/HeroCarousel";
import Features from "../components/Features";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <div className="text-center mt-10 mb-16">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
