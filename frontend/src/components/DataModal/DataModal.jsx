import { modalConfig } from "./modalConfig";

export default function DataModal({ type, mode, data, onClose, onSuccess }) {
  if (!type) return null;

  const config = modalConfig[type];
  if (!config) return null;

  const { Form, View } = config;

  const getTitle = () => {
    if (mode === "create") return `Add ${type}`;
    if (mode === "edit") return `Edit ${type}`;
    if (mode === "view") return `Detail ${type}`;
    return type;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 w-96 space-y-4 rounded shadow max-h-[90vh] overflow-y-auto">
        <h2 className="font-bold text-lg">{getTitle()}</h2>

        {mode === "view" ? (
          <View data={data} />
        ) : (
          <Form
            mode={mode}
            data={data}
            onClose={onClose}
            onSuccess={() => onSuccess?.(type)}
          />
        )}

        <div className="flex justify-end pt-3">
          <button onClick={onClose} className="border px-3 py-1 text-sm">
            {mode === "view" ? "Tutup" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
