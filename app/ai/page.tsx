"use client";

import Navbar from "@/components/Navbar";

export default function AIPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-4">AI Helpdesk</h1>

        <div className="bg-white rounded-md shadow-sm p-4 h-[400px] flex flex-col">
          <div className="flex-1 text-sm text-gray-500">
            Ask your School Education Haryana related problem...
          </div>

          <input
            placeholder="Type your question..."
            className="border rounded p-3 mt-4"
          />
        </div>
      </main>
    </>
  );
}
