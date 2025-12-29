export default function RoleChip({ role }: { role: string }) {
  const map: any = {
    ADMIN: "bg-blue-100 text-blue-800",
    MODERATOR: "bg-purple-100 text-purple-800",
    USER: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded ${map[role]}`}
    >
      {role}
    </span>
  );
}
