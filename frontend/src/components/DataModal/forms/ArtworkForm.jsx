import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";
import { FormInput, FormTextarea, FormSelect } from "../../Form/FormField";

export default function ArtworkForm({ mode, data, onClose, onSuccess }) {
  const [creators, setCreators] = useState([]);
  const [form, setForm] = useState({
    creator_id: "",
    title: "",
    description: "",
    media_url: "",
  });
  const [loading, setLoading] = useState(false);

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

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      onSuccess?.("Artwork");
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save artwork. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="artwork-form" onSubmit={submit} className="space-y-4">
      <FormSelect
        label="Artisan"
        required
        value={form.creator_id}
        onChange={(e) => setForm({ ...form, creator_id: e.target.value })}
        disabled={loading}
      >
        <option value="">Select an artisan</option>
        {creators.map((c) => (
          <option key={c.id} value={c.id}>
            Creator #{c.id} (User {c.user_id})
          </option>
        ))}
      </FormSelect>

      <FormInput
        label="Title"
        required
        placeholder="Artwork title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        disabled={loading}
      />

      <FormTextarea
        label="Description"
        rows={4}
        placeholder="Describe this artwork..."
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        disabled={loading}
      />

      <FormInput
        label="Media URL"
        type="url"
        required
        placeholder="https://example.com/image.jpg"
        value={form.media_url}
        onChange={(e) => setForm({ ...form, media_url: e.target.value })}
        disabled={loading}
      />
    </form>
  );
}
