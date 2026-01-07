import { useState, useEffect } from "react";
import { apiFetch } from "../../../api/api";

export default function UserForm({ mode, data, onClose, onSuccess }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "client",
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setForm({
        username: data.username || "",
        email: data.email || "",
        password: "",
        role: data.role || "client",
      });
    }
  }, [mode, data]);

  const submit = async () => {
    if (mode === "create") {
      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    if (mode === "edit") {
      const payload = { ...form };
      if (!payload.password) delete payload.password;

      await apiFetch(`/users/update?id=${data.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    }

    onClose();
    onSuccess?.("User");
  };

  return (
    <div className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="border p-2 w-full"
        placeholder={mode === "edit" ? "Password (optional)" : "Password"}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        className="border p-2 w-full"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="admin">admin</option>
        <option value="creator">creator</option>
        <option value="client">client</option>
      </select>

      <button
        onClick={submit}
        className="bg-blue-500 text-white px-3 py-1 text-sm"
      >
        Save
      </button>
    </div>
  );
}
