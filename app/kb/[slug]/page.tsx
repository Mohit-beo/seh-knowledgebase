import Navbar from "@/components/Navbar";

export default function ArticlePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">
          Salary Bill Preparation Process
        </h1>

        <article className="bg-white p-6 rounded-md shadow-sm leading-7">
          <p>
            This article explains the complete salary bill process for School
            Education Haryana employees...
          </p>

          <h3 className="font-semibold mt-6">Steps</h3>
          <ul className="list-disc ml-6 mt-2 text-sm">
            <li>Login to IFMS Haryana</li>
            <li>Verify employee data</li>
            <li>Generate bill</li>
            <li>Submit to treasury</li>
          </ul>
        </article>
      </main>
    </>
  );
}
