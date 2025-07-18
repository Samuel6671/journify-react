import { useState, useEffect } from "react";

type Message = {
  id: number;
  content: string;
  timestamp: string;
};

export default function Community() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("community-messages");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  const handlePost = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now(),
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [message, ...messages];
    setMessages(updated);
    localStorage.setItem("community-messages", JSON.stringify(updated));
    setNewMessage("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🗨️ Community Support Board</h2>

      <textarea
        rows={3}
        placeholder="Share your thoughts anonymously..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />

      <button onClick={handlePost} style={{ padding: "0.5rem 1rem", background: "#1c6d30", color: "white", border: "none" }}>
        Post
      </button>

      <div style={{ marginTop: "1rem" }}>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ background: "#f5f5f5", marginBottom: "1rem", padding: "1rem", borderRadius: "8px" }}>
              <p>{msg.content}</p>
              <small style={{ color: "#555" }}>{msg.timestamp}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
