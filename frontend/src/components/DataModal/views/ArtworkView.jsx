export default function ArtworkView({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-2 text-sm">
      <Row label="ID" value={data.id} />
      <Row label="Creator ID" value={data.creator_id} />
      <Row label="Title" value={data.title} />
      <Row label="Description" value={data.description} />

      <div className="flex">
        <span className="w-32 text-gray-500">Media</span>
        {data.media_url ? (
          <a
            href={data.media_url}
            target="_blank"
            className="text-blue-500 underline"
          >
            Open Media
          </a>
        ) : (
          <span>-</span>
        )}
      </div>

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
