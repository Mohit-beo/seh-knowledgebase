import Navbar from "@/components/Navbar";

export default function KnowledgebasePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">Knowledgebase</h1>

        <div className="grid gap-4">
          {articles.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-md shadow-sm hover:shadow transition"
            >
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              <span className="text-xs text-accent mt-2 inline-block">
                View details →
              </span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

const articles = [
  {
    title: "Salary Bill Preparation Process",
    desc: "Step-by-step guide for clerks and DDOs",
  },
  {
    title: "ESS Leave Approval Rules",
    desc: "Leave rules applicable to Haryana employees",
  },
  {
    title: "Service Book Maintenance",
    desc: "Important guidelines & formats",
  },
];
