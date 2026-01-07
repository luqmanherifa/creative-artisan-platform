import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";

export default function RequestForm({ mode, data, onClose, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [creators, setCreators] = useState([]);

  const [form, setForm] = useState({
    client_id: "",
    creator_id: "",
    title: "",
    details: "",
    status: "pending",
  });

  useEffect(() => {
    apiFetch("/users").then(setUsers);
    apiFetch("/creators").then(setCreators);

    if (mode === "edit" && data) {
      setForm({
        client_id: String(data.client_id),
        creator_id: String(data.creator_id),
        title: data.title || "",
        details: data.details || "",
        status: data.status || "pending",
      });
    }
  }, [mode, data]);

  const submit = async () => {
    const payload = {
      client_id: parseInt(form.client_id),
      creator_id: parseInt(form.creator_id),
      title: form.title,
      details: form.details,
      status: form.status,
    };

    if (mode === "create") {
      await apiFetch("/requests", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    if (mode === "edit") {
      await apiFetch(`/requests/update?id=${data.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    }

    onClose();
    onSuccess?.("Request");
  };

  return (
    <div className="space-y-2">
      <select
        className="border p-2 w-full"
        value={form.client_id}
        onChange={(e) => setForm({ ...form, client_id: e.target.value })}
      >
        <option value="">Select Client</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username} ({u.email})
          </option>
        ))}
      </select>

      <select
        className="border p-2 w-full"
        value={form.creator_id}
        onChange={(e) => setForm({ ...form, creator_id: e.target.value })}
      >
        <option value="">Select Creator</option>
        {creators.map((c) => (
          <option key={c.id} value={c.id}>
            Creator #{c.id}
          </option>
        ))}
      </select>

      <input
        className="border p-2 w-full"
        placeholder="Request Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="border p-2 w-full"
        rows={3}
        placeholder="Details"
        value={form.details}
        onChange={(e) => setForm({ ...form, details: e.target.value })}
      />

      {mode === "edit" && (
        <select
          className="border p-2 w-full"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      )}

      <button
        onClick={submit}
        className="bg-blue-500 text-white px-3 py-1 text-sm"
      >
        Save
      </button>
    </div>
  );
}
