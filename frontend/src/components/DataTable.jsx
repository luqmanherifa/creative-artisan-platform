import { Eye, Edit, Trash2 } from "lucide-react";

export default function DataTable({
  data,
  onSelect,
  onEdit,
  onDelete,
  emptyMessage,
}) {
  if (!Array.isArray(data)) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
        Invalid data format
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
        <p className="text-gray-500">{emptyMessage || "No data available"}</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((row) => {
              const rowKey = row.ID ?? row.id;
              if (!rowKey) {
                console.warn("Row without ID:", row);
              }
              return (
                <tr key={rowKey} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={`${rowKey}-${col}`}
                      className="px-6 py-4 text-sm text-gray-900"
                    >
                      {String(row[col])}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {onSelect && (
                        <button
                          onClick={() => onSelect(row)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
