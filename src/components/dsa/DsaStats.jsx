import "./DsaStats.css";

function DsaStats({ stats }) {
  const items = [
    { label: "Total Solved", value: stats.totalSolved },
    { label: "Easy", value: stats.easy },
    { label: "Medium", value: stats.medium },
    { label: "Hard", value: stats.hard },
  ];

  return (
    <div className="dsa-stats">
      {items.map((item) => (
        <div key={item.label} className="card dsa-stat-card">
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default DsaStats;