export default function StatusBadge({ approved }: { approved: boolean }) {
  return approved ? (
    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
      Approved
    </span>
  ) : (
    <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-800">
      Pending
    </span>
  );
}
