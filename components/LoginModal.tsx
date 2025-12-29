"use client";

import { X } from "lucide-react";

export default function LoginModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Login Required</h2>

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Mobile / Email"
        />
        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-primary text-white py-2 rounded">
          Login
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Only verified School Education Haryana employees are allowed.
        </p>
      </div>
    </div>
  );
}
