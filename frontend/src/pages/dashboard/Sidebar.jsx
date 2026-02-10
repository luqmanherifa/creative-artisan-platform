import {
  Users,
  Palette,
  FileImage,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar({ menus, active, onSelect }) {
  const getIcon = (key) => {
    const icons = {
      users: Users,
      creators: Palette,
      artworks: FileImage,
      requests: MessageSquare,
    };
    const Icon = icons[key] || LayoutDashboard;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-1">
          {menus.map((menu) => (
            <button
              key={menu.key}
              onClick={() => onSelect(menu.key)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${
                active === menu.key
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
              }`}
            >
              {getIcon(menu.key)}
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
