import Navbar from "@/components/Navbar";
import { BookOpen, FileText, MessageSquare, Bot } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search your problem, rule, or format..."
            className="w-full p-4 rounded-lg border shadow-sm focus:outline-none"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            icon={<BookOpen />}
            title="Knowledgebase"
            desc="Rules, circulars & procedures"
          />
          <Card
            icon={<FileText />}
            title="Formats"
            desc="Office formats & templates"
          />
          <Card
            icon={<MessageSquare />}
            title="Forum"
            desc="Discuss daily office issues"
          />
          <Card
            icon={<Bot />}
            title="AI Assistant"
            desc="Ask & solve problems instantly"
          />
        </div>
      </main>
    </>
  );
}

function Card({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer">
      <div className="text-primary mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
