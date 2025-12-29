"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  employeeType: string;
  district: string;
  role: string;
  approved: boolean;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function approveUser(userId: string, action: "APPROVE" | "REJECT") {
    await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    });
    loadUsers();
  }

  async function changeRole(userId: string, role: string) {
    await fetch("/api/admin/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    loadUsers();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">Admin Dashboard</h1>

        <div className="bg-white rounded-md shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.employeeType}</td>
                  <td className="p-3">{user.district}</td>

                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(user._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="USER">USER</option>
                      <option value="MODERATOR">MODERATOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>

                  <td className="p-3">
                    {user.approved ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <span className="text-orange-600">Pending</span>
                    )}
                  </td>

                  <td className="p-3 flex justify-center gap-2">
                    {!user.approved && (
                      <button
                        onClick={() =>
                          approveUser(user._id, "APPROVE")
                        }
                        className="text-green-600"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        approveUser(user._id, "REJECT")
                      }
                      className="text-red-600"
                      title="Reject"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
