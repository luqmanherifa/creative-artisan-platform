import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function Dashboard() {
  const [creators, setCreators] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creatorsData = await apiFetch("/creators");
        const artworksData = await apiFetch("/artworks");
        setCreators(creatorsData);
        setArtworks(artworksData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-xl font-semibold mt-4">Creators</h2>
      <ul>
        {creators.map((c) => (
          <li key={c.id}>
            {c.bio} - {c.website}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Artworks</h2>
      <ul>
        {artworks.map((a) => (
          <li key={a.id}>
            {a.title} - {a.mediaURL}
          </li>
        ))}
      </ul>
    </div>
  );
}
