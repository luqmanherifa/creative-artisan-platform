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
    if ((mode === "edit" || mode === "view") && data) {
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

  const getTitle = () => {
    if (mode === "create") return "Add User";
    if (mode === "edit") return "Edit User";
    if (mode === "view") return "Detail User";
    return "User";
  };

  const isReadOnly = mode === "view";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 w-96 space-y-3 rounded shadow">
        <h2 className="font-bold text-lg">{getTitle()}</h2>

        {mode === "view" ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 block mb-1">ID</label>
              <p className="border p-2 bg-gray-50">{data?.id || data?.ID}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                Username
              </label>
              <p className="border p-2 bg-gray-50">{form.username}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Email</label>
              <p className="border p-2 bg-gray-50">{form.email}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Role</label>
              <p className="border p-2 bg-gray-50">{form.role}</p>
            </div>
            {data?.created_at && (
              <div>
                <label className="text-xs text-gray-600 block mb-1">
                  Created At
                </label>
                <p className="border p-2 bg-gray-50">
                  {new Date(data.created_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <input
              className="border p-2 w-full"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              disabled={isReadOnly}
            />

            <input
              className="border p-2 w-full"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={isReadOnly}
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
              disabled={isReadOnly}
            />

            <select
              className="border p-2 w-full"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              disabled={isReadOnly}
            >
              <option value="admin">admin</option>
              <option value="creator">creator</option>
              <option value="client">client</option>
            </select>
          </>
        )}

        <div className="flex justify-between pt-3">
          {mode === "edit" && (
            <button onClick={remove} className="text-red-600 text-sm">
              Delete
            </button>
          )}

          <div className="space-x-2 ml-auto">
            <button onClick={onClose} className="text-sm border px-3 py-1">
              {mode === "view" ? "Tutup" : "Cancel"}
            </button>
            {mode !== "view" && (
              <button
                onClick={submit}
                className="border px-3 py-1 text-sm bg-blue-500 text-white"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
