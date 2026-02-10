export default function Sidebar({ menus, active, onSelect }) {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Dashboard Menu</h2>
        <nav className="space-y-1">
          {menus.map((menu) => (
            <button
              key={menu.key}
              onClick={() => onSelect(menu.key)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                active === menu.key
                  ? "bg-blue-600 text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {menu.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
