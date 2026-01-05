import { useState, useEffect } from "react";
import { apiFetch } from "../api/api";

export default function DataModal({ title, mode, data, onClose, onSuccess }) {
  const isUser = title === "User";

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

    if (mode === "create") {
      setForm({
        username: "",
        email: "",
        password: "",
        role: "client",
      });
    }
  }, [mode, data]);

  if (!isUser) return null;

  const submit = async () => {
    if (mode === "create") {
      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    if (mode === "edit") {
      const payload = {
        username: form.username,
        email: form.email,
        role: form.role,
      };

      if (form.password) {
        payload.password = form.password;
      }

      await apiFetch(`/users/update?id=${data.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    }

    onSuccess();
    onClose();
  };

  const remove = async () => {
    if (!window.confirm("Delete this user?")) return;

    await apiFetch(`/users/delete?id=${data.id}`, {
      method: "DELETE",
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 w-96 space-y-3 rounded shadow">
        <h2 className="font-bold text-lg">
          {mode === "create" ? "Add User" : "Edit User"}
        </h2>

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
          placeholder={
            mode === "edit"
              ? "Password (leave empty to keep current)"
              : "Password"
          }
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

        <div className="flex justify-between pt-3">
          {mode === "edit" && (
            <button onClick={remove} className="text-red-600 text-sm">
              Delete
            </button>
          )}

          <div className="space-x-2">
            <button onClick={onClose} className="text-sm">
              Cancel
            </button>
            <button onClick={submit} className="border px-3 py-1 text-sm">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
