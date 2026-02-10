import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [creators, setCreators] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [creatorsRes, artworksRes] = await Promise.all([
          fetch("http://localhost:8080/public/creators"),
          fetch("http://localhost:8080/public/artworks"),
        ]);

        const creatorsData = await creatorsRes.json();
        const artworksData = await artworksRes.json();

        setCreators(creatorsData || []);
        setArtworks(artworksData || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreatorClick = (creator) => {
    setSelectedCreator(creator);
    setSelectedArtwork(null);
  };

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    setSelectedCreator(null);
  };

  const closeModal = () => {
    setSelectedCreator(null);
    setSelectedArtwork(null);
  };

  const getCreatorImage = (creatorId) => {
    return `https://ui-avatars.com/api/?name=Creator+${creatorId}&background=4F46E5&color=fff&size=200`;
  };

  const getArtworkImage = (artworkId) => {
    const artImages = [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop",
    ];
    return artImages[artworkId % artImages.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Hire Creative Artisans for Your Project
          </h1>
          <p className="text-lg mb-6 text-blue-100">
            Connect with talented creators and bring your ideas to life
          </p>

          <div className="bg-white rounded-lg p-1 flex items-center max-w-2xl">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Search for creative services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-3 outline-none text-gray-800"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="border-b bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {creators.length}+
              </div>
              <div className="text-sm text-gray-600">Creators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {artworks.length}+
              </div>
              <div className="text-sm text-gray-600">Artworks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Creators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {creators.slice(0, 8).map((creator) => (
            <div
              key={creator.id}
              onClick={() => handleCreatorClick(creator)}
              className="bg-white border rounded-lg p-4 hover:border-blue-600 cursor-pointer"
            >
              <img
                src={getCreatorImage(creator.id)}
                alt={`Creator ${creator.user_id}`}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <h4 className="font-semibold text-center mb-2">
                Creator #{creator.user_id}
              </h4>
              <p className="text-gray-600 text-sm text-center mb-3 line-clamp-2">
                {creator.bio || "Professional creative artisan"}
              </p>

              <div className="flex items-center justify-center mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">5.0</span>
              </div>

              <div className="text-center text-sm border-t pt-2">
                <span className="text-gray-600">From </span>
                <span className="font-bold">$250</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Latest Artworks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.slice(0, 8).map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => handleArtworkClick(artwork)}
                className="bg-white border rounded-lg overflow-hidden hover:border-blue-600 cursor-pointer"
              >
                <img
                  src={getArtworkImage(artwork.id)}
                  alt={artwork.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h4 className="font-semibold mb-2">{artwork.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {artwork.description || "Professional artwork"}
                  </p>

                  <div className="flex items-center justify-between border-t pt-2">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-900">4.9</span>
                    </div>
                    <span className="font-bold">$150</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedCreator && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img
                    src={getCreatorImage(selectedCreator.id)}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold">
                      Creator #{selectedCreator.user_id}
                    </h2>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        5.0 (127 reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-700">
                    {selectedCreator.bio ||
                      "Professional creative artisan with years of experience."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Portfolio</h3>
                  {artworks.filter(
                    (art) => art.creator_id === selectedCreator.user_id,
                  ).length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {artworks
                        .filter(
                          (art) => art.creator_id === selectedCreator.user_id,
                        )
                        .map((art) => (
                          <div
                            key={art.id}
                            onClick={() => {
                              setSelectedCreator(null);
                              setSelectedArtwork(art);
                            }}
                            className="cursor-pointer"
                          >
                            <img
                              src={getArtworkImage(art.id)}
                              alt={art.title}
                              className="w-full h-24 object-cover rounded"
                            />
                            <p className="text-sm mt-1">{art.title}</p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No artworks yet</p>
                  )}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Contact Creator
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-600 hover:text-gray-900"
              >
                <span className="text-xl">×</span>
              </button>

              <img
                src={getArtworkImage(selectedArtwork.id)}
                alt={selectedArtwork.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    {selectedArtwork.title}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={getCreatorImage(selectedArtwork.creator_id)}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-medium">
                        Creator #{selectedArtwork.creator_id}
                      </p>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">From</div>
                  <div className="text-xl font-bold">$150</div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">
                  {selectedArtwork.description ||
                    "Professional creative artwork crafted with attention to detail."}
                </p>
              </div>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Request this Project
              </button>
              <p className="text-sm text-gray-500 text-center mt-2">
                Login required to send requests
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
