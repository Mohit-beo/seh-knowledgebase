// app/dashboard/page.tsx
"use client"; // only if using hooks like useEffect/useState

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome! You are logged in.</p>
    </div>
  );
}
