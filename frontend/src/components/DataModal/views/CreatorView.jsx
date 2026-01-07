export default function CreatorView({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-2 text-sm">
      <Row label="ID" value={data.id} />
      <Row label="User ID" value={data.user_id} />
      <Row label="Bio" value={data.bio} />
      <Row label="Website" value={data.website} />
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
