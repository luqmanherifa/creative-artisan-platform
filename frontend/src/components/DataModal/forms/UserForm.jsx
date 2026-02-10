import { useState, useEffect } from "react";
import { apiFetch } from "../../../api/api";
import { FormInput, FormSelect } from "../../Form/FormField";

export default function UserForm({ mode, data, onClose, onSuccess }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "client",
  });
  const [loading, setLoading] = useState(false);

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

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      onSuccess?.("User");
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="user-form" onSubmit={submit} className="space-y-4">
      <FormInput
        label="Username"
        required
        placeholder="Enter username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        disabled={loading}
      />

      <FormInput
        label="Email"
        type="email"
        required
        placeholder="user@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        disabled={loading}
      />

      <FormInput
        label="Password"
        type="password"
        required={mode === "create"}
        placeholder={
          mode === "edit"
            ? "Leave blank to keep current password"
            : "Enter password"
        }
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        disabled={loading}
      />

      <FormSelect
        label="Role"
        required
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        disabled={loading}
      >
        <option value="admin">Admin</option>
        <option value="creator">Creator</option>
        <option value="client">Client</option>
      </FormSelect>
    </form>
  );
}
