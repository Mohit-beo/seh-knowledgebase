"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      employeeType: form.employeeType.value,
      district: form.district.value,
      officeCode: form.officeCode.value,
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (res.ok) setSuccess(true);
  }

  return (
    <>
      <Navbar />

      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-xl font-semibold mb-2">
          Employee Registration
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Only School Education Haryana employees are allowed.  
          Registration will be approved by Admin.
        </p>

        {success ? (
          <div className="bg-green-50 border border-green-200 p-4 rounded text-green-700">
            Registration submitted successfully.  
            Your account is pending admin approval.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-md shadow-sm space-y-4"
          >
            <Input label="Full Name" name="name" required />
            <Input label="Email / Mobile" name="email" required />
            <Input
              label="Password"
              name="password"
              type="password"
              required
            />

            <Select
              label="Employee Type"
              name="employeeType"
              options={[
                "Teacher",
                "Clerk",
                "Headmaster",
                "BEO",
                "DEO",
              ]}
            />

            <Input label="District" name="district" required />
            <Input
              label="Office / School Code"
              name="officeCode"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded mt-2"
            >
              {loading ? "Submitting..." : "Register"}
            </button>
          </form>
        )}
      </main>
    </>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm block mb-1">{label}</label>
      <input
        {...props}
        className="w-full border p-2 rounded focus:outline-none"
      />
    </div>
  );
}

function Select({ label, name, options }: any) {
  return (
    <div>
      <label className="text-sm block mb-1">{label}</label>
      <select
        name={name}
        className="w-full border p-2 rounded"
      >
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
