import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import Section from "../components/Section";
import DataTable from "../components/DataTable";
import DataModal from "../components/DataModal";
import { logout } from "../utils/auth";

function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const role = getRoleFromToken();
  const navigate = useNavigate();

  const menus = [
    { key: "users", label: "Users", roles: ["admin"] },
    { key: "creators", label: "Creators", roles: ["admin", "creator"] },
    { key: "artworks", label: "Artworks", roles: ["admin", "creator"] },
    {
      key: "requests",
      label: "Requests",
      roles: ["admin", "creator", "client"],
    },
  ];

  const allowedMenus = menus.filter((m) => m.roles.includes(role));

  const [activeMenu, setActiveMenu] = useState(
    allowedMenus.length > 0 ? allowedMenus[0].key : ""
  );

  const [modal, setModal] = useState(null);
  const [users, setUsers] = useState([]);
  const [creators, setCreators] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const load = async () => {
      const results = await Promise.allSettled([
        apiFetch("/users"),
        apiFetch("/creators"),
        apiFetch("/artworks"),
        apiFetch("/requests"),
      ]);

      if (results[0].status === "fulfilled") setUsers(results[0].value);
      if (results[1].status === "fulfilled") setCreators(results[1].value);
      if (results[2].status === "fulfilled") setArtworks(results[2].value);
      if (results[3].status === "fulfilled") setRequests(results[3].value);
    };

    load();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const refreshData = async (key) => {
    switch (key) {
      case "users":
        setUsers(await apiFetch("/users"));
        break;
      case "creators":
        setCreators(await apiFetch("/creators"));
        break;
      case "artworks":
        setArtworks(await apiFetch("/artworks"));
        break;
      case "requests":
        setRequests(await apiFetch("/requests"));
        break;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-48 border-r p-4 space-y-2">
        <h2 className="font-bold mb-4">Dashboard</h2>

        {allowedMenus.map((menu) => (
          <button
            key={menu.key}
            onClick={() => setActiveMenu(menu.key)}
            className={`block w-full text-left px-2 py-1 text-sm border ${
              activeMenu === menu.key ? "bg-gray-200" : ""
            }`}
          >
            {menu.label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="mt-6 text-sm text-red-600 underline"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 space-y-6">
        {activeMenu === "users" && (
          <Section
            title="Users"
            action={
              <button
                className="border px-3 py-1 text-sm"
                onClick={() => setModal({ type: "User", mode: "create" })}
              >
                + Add User
              </button>
            }
          >
            <DataTable
              data={users}
              onSelect={(u) =>
                setModal({ type: "User", mode: "edit", data: u })
              }
            />
          </Section>
        )}

        {activeMenu === "creators" && (
          <Section title="Creators">
            <DataTable data={creators} />
          </Section>
        )}

        {activeMenu === "artworks" && (
          <Section title="Artworks">
            <DataTable data={artworks} />
          </Section>
        )}

        {activeMenu === "requests" && (
          <Section title="Requests">
            <DataTable data={requests} />
          </Section>
        )}
      </main>

      <DataModal
        title={modal?.type}
        mode={modal?.mode}
        data={modal?.data}
        onClose={() => setModal(null)}
        onSuccess={async () => {
          const users = await apiFetch("/users");
          setUsers(users);
        }}
      />
    </div>
  );
}
