import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  ArrowRight,
  Briefcase,
  Users,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-100 border-t-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading amazing artisans...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Inter']">
      <Navbar />

      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover skilled
              <span className="block bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
                creative artisans
              </span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              Connect with talented artisans specializing in unique creative
              crafts and custom artworks
            </p>
          </div>

          <div className="bg-white rounded-xl p-2 flex items-center max-w-3xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Search for artisan services or creative crafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-4 outline-none text-gray-800 placeholder-gray-400 text-base"
            />
            <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all font-medium">
              Search
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-indigo-200 text-sm mr-3">Popular:</span>
            {[
              "Handcrafted Art",
              "Custom Design",
              "Illustration",
              "Traditional Craft",
            ].map((tag) => (
              <button
                key={tag}
                className="inline-block bg-indigo-500/30 hover:bg-indigo-500/50 text-white px-4 py-1.5 rounded-full text-sm mr-2 mb-2 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {creators.length}+
              </div>
              <div className="text-gray-600 font-medium">Skilled Artisans</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {artworks.length}+
              </div>
              <div className="text-gray-600 font-medium">Custom Artworks</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Artisans
            </h2>
            <p className="text-gray-600">
              Handpicked creative specialists for your custom projects
            </p>
          </div>
          <button className="hidden md:flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            View all
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.slice(0, 8).map((creator) => (
            <div
              key={creator.id}
              onClick={() => handleCreatorClick(creator)}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-600 cursor-pointer transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={getCreatorImage(creator.id)}
                    alt={`Creator ${creator.user_id}`}
                    className="w-20 h-20 rounded-full ring-4 ring-gray-100 group-hover:ring-indigo-100 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full p-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 text-lg mb-2">
                  Creator #{creator.user_id}
                </h4>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {creator.bio || "Specialized creative artisan"}
                </p>

                <div className="flex items-center justify-center mb-4">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold ml-1 text-gray-900">
                    5.0
                  </span>
                  <span className="text-sm text-gray-500 ml-1">(127)</span>
                </div>

                <div className="w-full border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Starting at</span>
                    <span className="font-bold text-gray-900 text-lg">
                      $250
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="md:hidden w-full mt-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
          View all artisans
        </button>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Showcase Gallery
              </h2>
              <p className="text-gray-600">
                Explore unique handcrafted works from our artisan community
              </p>
            </div>
            <button className="hidden md:flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
              Explore more
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artworks.slice(0, 8).map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => handleArtworkClick(artwork)}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-indigo-600 cursor-pointer transition-all"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getArtworkImage(artwork.id)}
                    alt={artwork.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-bold text-gray-900 text-sm">
                      $150
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {artwork.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {artwork.description || "Handcrafted custom artwork"}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="ml-1 text-sm font-semibold text-gray-900">
                        4.9
                      </span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="md:hidden w-full mt-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            Explore more work
          </button>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to commission your custom artwork?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join clients who found skilled artisans to craft their unique
            creative projects on Kreta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Browse Artisans
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {selectedCreator && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={getCreatorImage(selectedCreator.id)}
                      className="w-20 h-20 rounded-full ring-4 ring-indigo-100"
                      alt="Creator"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full p-1.5">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="ml-5">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      Creator #{selectedCreator.user_id}
                    </h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="ml-2 font-semibold text-gray-900">
                        5.0
                      </span>
                      <span className="ml-2 text-gray-600">(127 reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCreator.bio ||
                    "Skilled creative artisan with years of experience in crafting unique, custom works. Specialized in delivering exceptional quality that brings your creative vision to life."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">Artworks</div>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    98%
                  </div>
                  <div className="text-sm text-gray-600">Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    $250
                  </div>
                  <div className="text-sm text-gray-600">Starting</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Portfolio
                </h3>
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
                          className="group cursor-pointer"
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={getArtworkImage(art.id)}
                              alt={art.title}
                              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-900 mt-2 line-clamp-1">
                            {art.title}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">No artworks yet</p>
                  </div>
                )}
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all">
                Contact Artisan
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-600 hover:text-gray-900 z-10 transition-colors"
              >
                <span className="text-2xl leading-none">×</span>
              </button>

              <img
                src={getArtworkImage(selectedArtwork.id)}
                alt={selectedArtwork.title}
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedArtwork.title}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={getCreatorImage(selectedArtwork.creator_id)}
                      className="w-12 h-12 rounded-full ring-2 ring-gray-100"
                      alt="Creator"
                    />
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">
                        Creator #{selectedArtwork.creator_id}
                      </p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="ml-1 text-sm font-semibold text-gray-900">
                          4.9
                        </span>
                        <span className="ml-1 text-sm text-gray-600">(89)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-sm text-gray-600 mb-1">Starting at</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    $150
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About this work
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedArtwork.description ||
                    "Unique handcrafted artwork created with meticulous attention to detail. This custom piece showcases exceptional artisan craftsmanship, perfect for bringing your creative vision to reality."}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Custom Made
                      </div>
                      <div className="text-sm text-gray-600">
                        Tailored to specs
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Revisions</div>
                      <div className="text-sm text-gray-600">
                        Until satisfied
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Full Rights
                      </div>
                      <div className="text-sm text-gray-600">
                        Commercial use
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Artisan Support
                      </div>
                      <div className="text-sm text-gray-600">
                        Direct contact
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all mb-3"
              >
                Request Custom Artwork
              </button>
              <p className="text-sm text-gray-500 text-center">
                Login to submit your project request
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
