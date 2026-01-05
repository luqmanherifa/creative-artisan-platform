export default function Section({ title, children, action }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
