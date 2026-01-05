const BASE_URL = "http://localhost:8080";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(BASE_URL + url, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
