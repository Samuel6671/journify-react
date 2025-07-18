import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Journal from "./pages/Journal";
import MoodTracker from "./pages/MoodTracker";
import Insights from "./pages/Insights";
import Community from "./pages/Community";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: 10 }}>Journal</Link>
        <Link to="/mood-tracker" style={{ marginRight: 10 }}>Mood Tracker</Link>
        <Link to="/insights" style={{ marginRight: 10 }}>Insights</Link>
        <Link to="/community">Community</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Journal />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
