"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => setUser(data.user));
        }
      });
  }, []);

  if (!user) return <div>Loading user info...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <div className="mt-6 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Dashboard Content</h3>
        <p>This is your secure dashboard page.</p>
      </div>
    </div>
  );
}
