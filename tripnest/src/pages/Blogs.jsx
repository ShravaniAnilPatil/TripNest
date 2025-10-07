import { useEffect, useMemo, useState } from "react";
import beach1 from "../assets/beach1.jpeg";
import beach2 from "../assets/beach2.jpeg";
import mountain1 from "../assets/mountain1.jpeg";
import mountain2 from "../assets/mountain2.jpeg";
import city1 from "../assets/city1.jpeg";
import city2 from "../assets/city2.jpeg";

const DEFAULT_DESTINATIONS = [
  { title: "Bali Beach", type: "Beach", image: beach1 },
  { title: "Malibu Beach", type: "Beach", image: beach2 },
  { title: "Swiss Alps", type: "Mountain", image: mountain1 },
  { title: "Rocky Mountains", type: "Mountain", image: mountain2 },
  { title: "Paris", type: "City", image: city1 },
  { title: "London", type: "City", image: city2 },
];

const LOCAL_STORAGE_KEY = "tripnest.blogs";

function loadBlogs() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function saveBlogs(blogs) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
}

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({
    destination: "Bali Beach",
    title: "",
    content: "",
    author: "",
  });

  const destinations = DEFAULT_DESTINATIONS;
  const destinationTitles = useMemo(
    () => destinations.map((d) => d.title),
    [destinations]
  );

  useEffect(() => {
    setBlogs(loadBlogs());
  }, []);

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const newBlog = {
      id: Date.now(),
      destination: formData.destination,
      title: formData.title.trim(),
      content: formData.content.trim(),
      author: formData.author.trim() || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    const next = [newBlog, ...blogs];
    setBlogs(next);
    saveBlogs(next);
    setFormData({ destination: formData.destination, title: "", content: "", author: "" });
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchDestination =
      filter === "All" || b.destination === filter || b.destination === formData.destination;
    const haystack = `${b.title} ${b.content} ${b.destination} ${b.author}`.toLowerCase();
    const matchSearch = haystack.includes(search.toLowerCase());
    return matchDestination && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Travel Blogs</h2>

      <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-56 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              {destinationTitles.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-600">
              No blogs yet. Be the first to share your experience!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredBlogs.map((b) => {
                const cover = destinations.find((d) => d.title === b.destination)?.image || city1;
                return (
                  <article key={b.id} className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-[1.01] transform transition">
                    <img src={cover} alt={b.destination} className="w-full h-40 object-cover" />
                    <div className="p-5 flex flex-col gap-2">
                      <div className="text-sm text-blue-700 font-semibold">{b.destination}</div>
                      <h3 className="text-xl font-bold">{b.title}</h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-4">{b.content}</p>
                      <div className="text-sm text-gray-500 mt-2">
                        By {b.author || "Anonymous"} · {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <aside className="md:col-span-1 bg-white shadow-lg rounded-2xl p-6 sticky top-24">
          <h4 className="text-xl font-semibold mb-4 text-blue-700">Add a New Blog</h4>
          <form onSubmit={handleAddBlog} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Destination</label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {destinationTitles.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Amazing trip to..."
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                placeholder="Share your experience, tips, and highlights..."
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Your name (optional)"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Publish Blog
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default Blogs;


