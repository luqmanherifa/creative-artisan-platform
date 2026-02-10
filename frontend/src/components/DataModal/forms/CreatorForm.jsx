import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";
import { FormInput, FormTextarea, FormSelect } from "../../Form/FormField";

export default function CreatorForm({ mode, data, onClose, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    bio: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch("/users").then(setUsers);

    if (mode === "edit" && data) {
      setForm({
        user_id: String(data.user_id),
        bio: data.bio || "",
        website: data.website || "",
      });
    }
  }, [mode, data]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        user_id: parseInt(form.user_id),
        bio: form.bio,
        website: form.website,
      };

      if (mode === "create") {
        await apiFetch("/creators", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (mode === "edit") {
        await apiFetch(`/creators/update?id=${data.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      }

      onSuccess?.("Creator");
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save artisan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="creator-form" onSubmit={submit} className="space-y-4">
      <FormSelect
        label="User Account"
        required
        value={form.user_id}
        onChange={(e) => setForm({ ...form, user_id: e.target.value })}
        disabled={loading || mode === "edit"}
      >
        <option value="">Select a user</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username} ({u.email})
          </option>
        ))}
      </FormSelect>

      <FormTextarea
        label="Bio"
        rows={4}
        placeholder="Tell us about this artisan..."
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        disabled={loading}
      />

      <FormInput
        label="Website"
        type="url"
        placeholder="https://example.com"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        disabled={loading}
      />
    </form>
  );
}
