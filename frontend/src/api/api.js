const API_URL = "http://localhost:8080";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const method = (options.method || "GET").toUpperCase();

  const res = await fetch(API_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  if (method === "DELETE" || res.status === 204) {
    return null;
  }

  const text = await res.text();
  if (!text.trim()) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON response");
  }
}
