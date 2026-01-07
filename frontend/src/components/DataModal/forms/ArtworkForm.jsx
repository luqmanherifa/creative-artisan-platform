import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";

export default function ArtworkForm({ mode, data, onClose, onSuccess }) {
  const [creators, setCreators] = useState([]);
  const [form, setForm] = useState({
    creator_id: "",
    title: "",
    description: "",
    media_url: "",
  });

  useEffect(() => {
    apiFetch("/creators").then(setCreators);

    if (mode === "edit" && data) {
      setForm({
        creator_id: String(data.creator_id),
        title: data.title || "",
        description: data.description || "",
        media_url: data.media_url || "",
      });
    }
  }, [mode, data]);

  const submit = async () => {
    const payload = {
      creator_id: parseInt(form.creator_id),
      title: form.title,
      description: form.description,
      media_url: form.media_url,
    };

    if (mode === "create") {
      await apiFetch("/artworks", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    if (mode === "edit") {
      await apiFetch(`/artworks/update?id=${data.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    }

    onClose();
    onSuccess?.("Artwork");
  };

  return (
    <div className="space-y-2">
      <select
        className="border p-2 w-full"
        value={form.creator_id}
        onChange={(e) => setForm({ ...form, creator_id: e.target.value })}
      >
        <option value="">Select Creator</option>
        {creators.map((c) => (
          <option key={c.id} value={c.id}>
            Creator #{c.id} (User {c.user_id})
          </option>
        ))}
      </select>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="border p-2 w-full"
        rows={3}
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Media URL"
        value={form.media_url}
        onChange={(e) => setForm({ ...form, media_url: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-blue-500 text-white px-3 py-1 text-sm"
      >
        Save
      </button>
    </div>
  );
}
