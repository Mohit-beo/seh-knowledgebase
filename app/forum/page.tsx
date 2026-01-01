"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { name: string; role: string; email: string };
type Answer = { _id: string; text: string; userName: string; userId: string; createdAt: string };
type Question = {
  _id: string;
  title: string;
  text: string;
  userName: string;
  userId: string;
  createdAt: string;
  answers: Answer[];
};

export default function ForumPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({ title: "", text: "" });

  // Fetch user session
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.status === 200 ? res.json() : null)
      .then((data) => {
        if (data?.user) setUser(data.user);
      });
  }, []);

  // Fetch questions
  useEffect(() => {
    fetch("/api/forum/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .finally(() => setLoading(false));
  }, []);

  // Submit new question
  const submitQuestion = () => {
    if (!user) {
      alert("Please login to post a question");
      return;
    }

    fetch("/api/forum/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newQuestion }),
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setNewQuestion({ title: "", text: "" });
        router.refresh();
      }
    });
  };

  // Submit answer
  const submitAnswer = (questionId: string, text: string) => {
    if (!user) {
      alert("Please login to post an answer");
      return;
    }

    fetch(`/api/forum/questions/${questionId}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      credentials: "include",
    }).then((res) => res.ok && router.refresh());
  };

  if (loading) return <div className="p-6">Loading forum...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Forum</h1>

      {/* New Question Form */}
      {user ? (
        <div className="mb-6 p-4 border rounded bg-white shadow">
          <h2 className="font-semibold mb-2">Ask a Question</h2>
          <input
            className="w-full border p-2 mb-2"
            placeholder="Title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
          />
          <textarea
            className="w-full border p-2 mb-2"
            placeholder="Details"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          />
          <button
            onClick={submitQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Question
          </button>
        </div>
      ) : (
        <p className="mb-6 text-gray-600">Login to post a question or answer.</p>
      )}

      {/* Questions List */}
      {questions.map((q) => (
        <div key={q._id} className="mb-6 p-4 border rounded bg-white shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{q.title}</h3>
            <span className="text-sm text-gray-500">{new Date(q.createdAt).toLocaleString()}</span>
          </div>
          <p className="mb-2">{q.text}</p>
          <p className="text-sm text-gray-600 mb-4">Asked by: {q.userName}</p>

          {/* Answers */}
          <div className="pl-4 border-l border-gray-300">
            {q.answers.map((a) => (
              <div key={a._id} className="mb-2">
                <p>{a.text}</p>
                <p className="text-sm text-gray-500">
                  Answered by: {a.userName} at {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            ))}

            {/* New Answer Form */}
            {user && (
              <div className="mt-2">
                <textarea
                  placeholder="Write an answer..."
                  className="w-full border p-2 mb-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submitAnswer(q._id, (e.target as HTMLTextAreaElement).value);
                      (e.target as HTMLTextAreaElement).value = "";
                    }
                  }}
                />
                <small className="text-gray-500">Press Enter to submit</small>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
