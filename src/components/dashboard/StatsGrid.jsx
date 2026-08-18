import { getItem } from "../../utils/storage.js";
import "./StatsGrid.css";

function getStats() {
  const dsa = getItem("dsa") || [];
  const learning = getItem("learning") || [];
  const applications = getItem("applications") || [];
  const interviews = getItem("interviews") || [];
  const projects = getItem("projects") || [];

  const solvedCount = dsa.filter((p) => p.status === "Solved").length;

  const avgLearningProgress =
    learning.length > 0
      ? Math.round(
          learning.reduce((sum, s) => sum + (s.progress || 0), 0) / learning.length
        )
      : 0;

  const upcomingInterviewCount = interviews.filter(
    (i) => new Date(i.date) >= new Date()
  ).length;

  return [
    { label: "Problems Solved", value: solvedCount },
    { label: "Learning Progress", value: `${avgLearningProgress}%` },
    { label: "Applications", value: applications.length },
    { label: "Upcoming Interviews", value: upcomingInterviewCount },
    { label: "Projects", value: projects.length },
  ];
}

function StatsGrid() {
  const stats = getStats();

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="card stat-card">
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

export default StatsGrid;