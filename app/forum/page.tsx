"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Answer = {
  _id: string;
  text: string;
  userId: string;
  userName: string;
};

type Question = {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  createdByName: string;
  answers: Answer[];
};

export default function ForumPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingAnswer, setEditingAnswer] = useState<{
    questionId: string;
    _id: string;
    text: string;
  } | null>(null);

  // TEMP – replace later with real auth data
  const currentUserId = "demo-user";
  const isAdmin = true;

  // Load questions
  async function loadQuestions() {
    const res = await fetch("/api/forum/list");
    const data = await res.json();
    setQuestions(data);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  // Create Question
  async function submitQuestion() {
    if (!title || !description) return;

    await fetch("/api/forum/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        userId: currentUserId,
        userName: "Demo User",
      }),
    });

    setTitle("");
    setDescription("");
    loadQuestions();
  }

  // Delete Answer
  async function deleteAnswer(questionId: string, answerId: string) {
    await fetch("/api/forum/answer/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answerId }),
    });

    loadQuestions();
  }

  // Update Answer
  async function updateAnswer() {
    if (!editingAnswer) return;

    await fetch("/api/forum/answer/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingAnswer),
    });

    setEditingAnswer(null);
    loadQuestions();
  }

  return (
    <>
    <Navbar/>
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">
        Employee Forum
      </h1>

      {/* CREATE QUESTION */}
      <div className="bg-white border p-4 mb-6 rounded">
        <h2 className="font-medium mb-2">Ask a Question</h2>
        <input
          className="w-full border p-2 mb-2"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2"
          placeholder="Describe your issue"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={submitQuestion}
          className="mt-2 bg-blue-700 text-white px-4 py-2"
        >
          Post Question
        </button>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q._id} className="border p-4 rounded">
            <h3 className="font-semibold">{q.title}</h3>
            <p className="text-sm mt-1">{q.description}</p>

            <p className="text-xs text-gray-500 mt-1">
              Asked by {q.createdByName}
            </p>

            {/* ANSWERS */}
            <div className="mt-3 space-y-3">
              {q.answers.map((a) => (
                <div
                  key={a._id}
                  className="border-l-4 pl-3 py-2 bg-gray-50"
                >
                  <p className="text-sm">{a.text}</p>

                  <div className="text-xs text-gray-500 mt-1 flex gap-3">
                    <span>— {a.userName}</span>

                    {(a.userId === currentUserId || isAdmin) && (
                      <>
                        <button
                          className="text-blue-600"
                          onClick={() =>
                            setEditingAnswer({
                              _id: a._id,
                              questionId: q._id,
                              text: a.text,
                            })
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="text-red-600"
                          onClick={() =>
                            deleteAnswer(q._id, a._id)
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingAnswer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="font-semibold mb-2">Edit Answer</h3>

            <textarea
              className="w-full border p-2"
              rows={4}
              value={editingAnswer.text}
              onChange={(e) =>
                setEditingAnswer({
                  ...editingAnswer,
                  text: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-1 border"
                onClick={() => setEditingAnswer(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white"
                onClick={updateAnswer}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
