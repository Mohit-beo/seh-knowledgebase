"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          router.replace("/auth/login"); // redirect if not logged in
        } else {
          return res.json().then((data) => setUser(data.user));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST", credentials: "include" })
      .then(() => {
        router.replace("/auth/login");
      });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Dashboard</h1>
        <div className="flex items-center gap-4">
          {user && <span>{user.name} ({user.role})</span>}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
