"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [relationship, setRelationship] = useState("Recruiter");
  const [goal, setGoal] = useState("Show interest");
  const [tone, setTone] = useState("Natural");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateReply() {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          relationship,
          goal,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setReply("Something went wrong.");
        return;
      }

      setReply(data.reply);
    } catch {
      setReply("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "80px auto", padding: 20 }}>
      <h1>TalkingSmart</h1>

      <p>Don't know how to reply? Paste the message below.</p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste their message here..."
        style={{
          width: "100%",
          height: 150,
          padding: 15,
          fontSize: 16,
          marginTop: 20,
        }}
      />

      <p>Who is this person?</p>

      <select
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
      >
        <option>Recruiter</option>
        <option>Friend</option>
        <option>Colleague</option>
        <option>Dating</option>
        <option>Family</option>
      </select>

      <p>What do you want to do?</p>

      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option>Show interest</option>
        <option>Accept</option>
        <option>Decline politely</option>
        <option>Ask for more information</option>
        <option>Keep conversation going</option>
      </select>

      <p>Choose a tone</p>

      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Natural</option>
        <option>Professional</option>
        <option>Friendly</option>
        <option>Confident</option>
      </select>

      <br />

      <button
        onClick={generateReply}
        disabled={loading}
        style={{
          marginTop: 30,
          padding: "12px 24px",
          fontSize: 16,
        }}
      >
        {loading ? "Thinking..." : "Generate Reply"}
      </button>

      {reply && (
        <div style={{ marginTop: 30 }}>
          <h2>Suggested Reply</h2>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}