export default function Sidebar({ menus, active, onSelect, onLogout }) {
  return (
    <aside className="w-48 border-r p-4 space-y-2">
      <h2 className="font-bold mb-4">Dashboard</h2>

      {menus.map((menu) => (
        <button
          key={menu.key}
          onClick={() => onSelect(menu.key)}
          className={`block w-full text-left px-2 py-1 text-sm border ${
            active === menu.key ? "bg-gray-200" : ""
          }`}
        >
          {menu.label}
        </button>
      ))}

      <button
        onClick={onLogout}
        className="mt-6 text-sm text-red-600 underline"
      >
        Logout
      </button>
    </aside>
  );
}
