'use client';

import Navbar from "@/components/Navbar";
import { Lock } from "lucide-react";

export default function FormatsPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">Office Formats</h1>

        <div className="bg-white rounded-md shadow-sm divide-y">
          {formats.map((item, index) => (
            <div key={index} className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.type}</p>
              </div>

              <button
                onClick={() => alert("Please login to download")}
                className="flex items-center gap-2 text-sm border px-4 py-1 rounded-md"
              >
                <Lock size={14} />
                Download
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

const formats = [
  { title: "Leave Application Format", type: "PDF" },
  { title: "Inquiry Notice Format", type: "DOC" },
  { title: "Stock Register Format", type: "XLS" },
];
