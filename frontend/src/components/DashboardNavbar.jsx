import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function DashboardNavbar({ onLogout }) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-xl font-bold text-blue-600">
            CreativeArtisan
          </Link>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-4 py-2 rounded hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
