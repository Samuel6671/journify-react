import { useEffect, useState } from "react";
// import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MoodEntry = {
  mood: string;
  note: string;
  date: string;
};

const moodToValue: Record<string, number> = {
  Happy: 1,
  Good: 2,
  Neutral: 3,
  Sad: 4,
  Angry: 5,
};

export default function Insights() {
  const [logs, setLogs] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("mood-logs");
    if (stored) {
      setLogs(JSON.parse(stored));
    }
  }, []);

  const chartData = logs.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    moodValue: moodToValue[entry.mood] || 0,
  }));

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Mood Insights</h2>

      {logs.length === 0 ? (
        <p>No mood entries yet.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="date" />
    <YAxis
      domain={[1, 5]}
     tickFormatter={(value) =>
  Object.keys(moodToValue).find((key) => moodToValue[key] === value) || ''
}


    />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="moodValue"
      stroke="#1c6d30"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>

          <ul style={{ marginTop: "2rem" }}>
            {logs.map((entry, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <strong>{entry.mood}</strong> -{" "}
                {new Date(entry.date).toLocaleString()}
                <br />
                {entry.note && <em>Note: {entry.note}</em>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
