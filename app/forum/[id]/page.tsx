"use client";

import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";

export default function ForumPost() {
  const [login, setLogin] = useState(false);

  return (
    <>
      <Navbar />
      <LoginModal open={login} onClose={() => setLogin(false)} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-3">
          Salary not generated in IFMS
        </h1>

        <div className="bg-white p-5 rounded shadow-sm mb-6">
          <p className="text-sm leading-6">
            While generating salary bill, system shows error “Employee data
            mismatch”. Kindly suggest solution.
          </p>
        </div>

        <h3 className="font-semibold mb-3">Comments</h3>

        <div className="bg-white p-4 rounded shadow-sm text-sm text-gray-500">
          Please{" "}
          <button
            onClick={() => setLogin(true)}
            className="text-accent underline"
          >
            login
          </button>{" "}
          to comment.
        </div>
      </main>
    </>
  );
}
