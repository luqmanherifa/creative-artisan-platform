export default function RequestView({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-2 text-sm">
      <Row label="ID" value={data.id} />
      <Row label="Client ID" value={data.client_id} />
      <Row label="Creator ID" value={data.creator_id} />
      <Row label="Title" value={data.title} />
      <Row label="Details" value={data.details} />
      <Row label="Status" value={data.status} />
      <Row label="Created At" value={data.created_at} />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex">
      <span className="w-32 text-gray-500">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}
