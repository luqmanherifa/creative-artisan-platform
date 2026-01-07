export default function UserView({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-2 text-sm">
      <Row label="ID" value={data.id} />
      <Row label="Username" value={data.username} />
      <Row label="Email" value={data.email} />
      <Row label="Role" value={data.role} />
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
