import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DataModal from "../../components/DataModal/DataModal";
import { logout } from "../../utils/auth";
import { useAuthRole } from "../../hooks/useAuthRole";
import { dashboardRoutes } from "./routes";

export default function Dashboard() {
  const role = useAuthRole();
  const navigate = useNavigate();
  const location = useLocation();

  const [modal, setModal] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const menus = [
    { key: "users", label: "Users", roles: ["admin"] },
    { key: "creators", label: "Creators", roles: ["admin", "creator"] },
    { key: "artworks", label: "Artworks", roles: ["admin", "creator"] },
    {
      key: "requests",
      label: "Requests",
      roles: ["admin", "creator", "client"],
    },
  ].filter((m) => m.roles.includes(role));

  const openModal = (type, mode, data) => setModal({ type, mode, data });

  return (
    <div className="flex min-h-screen">
      <Sidebar
        menus={menus}
        active={location.pathname.split("/")[2]}
        onSelect={(key) => navigate(`/dashboard/${key}`)}
        onLogout={() => {
          logout();
          navigate("/login", { replace: true });
        }}
      />

      <main className="flex-1 p-6">
        <Routes>
          {dashboardRoutes(openModal, refreshKey).map((r) => (
            <Route key={r.path} {...r} />
          ))}
        </Routes>
      </main>

      {modal && (
        <DataModal
          {...modal}
          onClose={() => setModal(null)}
          onSuccess={() => {
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
}
