import "./BarBreakdown.css";

function BarBreakdown({ items }) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="bar-breakdown">
      {items.map((item) => (
        <div key={item.label} className="bar-breakdown-row">
          <span className="bar-breakdown-label">{item.label}</span>
          <div className="bar-breakdown-track">
            <div
              className="bar-breakdown-fill"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          <span className="bar-breakdown-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default BarBreakdown;