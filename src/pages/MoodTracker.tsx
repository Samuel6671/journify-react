import { useState } from "react";

const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😰", label: "Anxious" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!selectedMood) {
      setMessage("Please select a mood.");
      return;
    }

    const moodEntry = {
      mood: selectedMood,
      note,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("mood-logs") || "[]");
    localStorage.setItem("mood-logs", JSON.stringify([moodEntry, ...existing]));

    setMessage("✅ Mood logged!");
    setSelectedMood("");
    setNote("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Mood Tracker</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood.label)}
            style={{
              fontSize: "2rem",
              border: selectedMood === mood.label ? "2px solid blue" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              background: selectedMood === mood.label ? "#e0f7fa" : "#fff",
            }}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Optional note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
      />

      <button onClick={handleSave}>Save Mood</button>
      {message && <p>{message}</p>}
    </div>
  );
}

