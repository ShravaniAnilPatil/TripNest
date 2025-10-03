const Features = () => {
  const features = [
    {
      title: "Plan Seamlessly",
      desc: "Create, organize, and share your trips with ease."
    },
    {
      title: "Smart Suggestions",
      desc: "Get AI-powered destination & itinerary ideas."
    },
    {
      title: "Travel Together",
      desc: "Collaborate with friends and family on trip plans."
    },
  ];

  return (
    <section id="features" className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Why Choose TripNest?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {features.map((f, i) => (
          <div key={i} className="p-6 shadow-lg rounded-2xl bg-blue-50">
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
