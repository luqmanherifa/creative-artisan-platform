export default function DataTable({
  data,
  onSelect,
  onEdit,
  onDelete,
  emptyMessage,
}) {
  if (!Array.isArray(data)) {
    return <p className="text-sm text-red-500">Invalid data</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-xs text-red-600">
        {emptyMessage || "No data or not allowed"}
      </p>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <table className="border w-full text-sm">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="border px-2 py-1 text-left">
              {col}
            </th>
          ))}
          <th className="border px-2 py-1 text-left">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => {
          const rowKey = row.ID ?? row.id;

          if (!rowKey) {
            console.warn("Row without ID:", row);
          }

          return (
            <tr key={rowKey} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={`${rowKey}-${col}`} className="border px-2 py-1">
                  {String(row[col])}
                </td>
              ))}
              <td className="border px-2 py-1">
                <div className="flex gap-2">
                  {onSelect && (
                    <button
                      onClick={() => onSelect(row)}
                      className="text-blue-600 hover:text-blue-800 text-xs underline"
                    >
                      Rincian
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-green-600 hover:text-green-800 text-xs underline"
                    >
                      Ubah
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-600 hover:text-red-800 text-xs underline"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
