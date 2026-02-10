import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";
import { FormInput, FormTextarea, FormSelect } from "../../Form/FormField";

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
  const [loading, setLoading] = useState(false);

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

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      onSuccess?.("Request");
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "pending", label: "Pending", color: "text-yellow-700" },
    { value: "in_progress", label: "In Progress", color: "text-blue-700" },
    { value: "completed", label: "Completed", color: "text-green-700" },
    { value: "rejected", label: "Rejected", color: "text-red-700" },
  ];

  return (
    <form id="request-form" onSubmit={submit} className="space-y-4">
      <FormSelect
        label="Client"
        required
        value={form.client_id}
        onChange={(e) => setForm({ ...form, client_id: e.target.value })}
        disabled={loading}
      >
        <option value="">Select a client</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username} ({u.email})
          </option>
        ))}
      </FormSelect>

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
        label="Project Title"
        required
        placeholder="Enter project title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        disabled={loading}
      />

      <FormTextarea
        label="Project Details"
        required
        rows={4}
        placeholder="Describe the project requirements..."
        value={form.details}
        onChange={(e) => setForm({ ...form, details: e.target.value })}
        disabled={loading}
      />

      {mode === "edit" && (
        <FormSelect
          label="Status"
          required
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          disabled={loading}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FormSelect>
      )}
    </form>
  );
}
