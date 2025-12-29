"use client";

import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/StatusBadge";
import RoleChip from "@/components/RoleChip";
import { useEffect, useState } from "react";

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
    setUsers(await res.json());
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function approve(userId: string) {
    if (!confirm("Approve this employee?")) return;
    await fetch("/api/admin/approve", {
      method: "POST",
      body: JSON.stringify({ userId, action: "APPROVE" }),
    });
    loadUsers();
  }

  async function reject(userId: string) {
    if (!confirm("Reject and delete this employee?")) return;
    await fetch("/api/admin/approve", {
      method: "POST",
      body: JSON.stringify({ userId, action: "REJECT" }),
    });
    loadUsers();
  }

  async function changeRole(userId: string, role: string) {
    await fetch("/api/admin/role", {
      method: "POST",
      body: JSON.stringify({ userId, role }),
    });
    loadUsers();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-lg font-semibold mb-4">
          Admin Dashboard – User Approval
        </h1>

        <div className="bg-white border border-border rounded overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-surface border-b">
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Employee Type</Th>
                <Th>District</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-surface">
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td>{u.employeeType}</Td>
                  <Td>{u.district}</Td>

                  <Td>
                    <select
                      value={u.role}
                      onChange={(e) =>
                        changeRole(u._id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value="USER">USER</option>
                      <option value="MODERATOR">MODERATOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </Td>

                  <Td>
                    <StatusBadge approved={u.approved} />
                  </Td>

                  <Td className="space-x-2">
                    {!u.approved && (
                      <button
                        onClick={() => approve(u._id)}
                        className="text-success text-xs"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => reject(u._id)}
                      className="text-danger text-xs"
                    >
                      Reject
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

function Th({ children }: any) {
  return (
    <th className="text-left px-3 py-2 font-medium">
      {children}
    </th>
  );
}

function Td({ children }: any) {
  return <td className="px-3 py-2">{children}</td>;
}
