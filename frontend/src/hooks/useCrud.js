import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export function useCrud(endpoint, refreshKey = 0) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await apiFetch(endpoint);
      setData(res || []);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, refreshKey]);

  const remove = async (id) => {
    await apiFetch(`${endpoint}/delete?id=${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return {
    data,
    reload: fetchData,
    remove,
  };
}
