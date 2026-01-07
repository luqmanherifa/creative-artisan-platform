import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";

export default function CreatorForm({ mode, data, onClose, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    bio: "",
    website: "",
  });

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

  const submit = async () => {
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

    onClose();
    onSuccess?.("Creator");
  };

  return (
    <div className="space-y-2">
      <select
        className="border p-2 w-full"
        value={form.user_id}
        onChange={(e) => setForm({ ...form, user_id: e.target.value })}
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username} ({u.email})
          </option>
        ))}
      </select>

      <textarea
        className="border p-2 w-full"
        rows={3}
        placeholder="Bio"
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
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
