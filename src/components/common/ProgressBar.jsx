import "./ProgressBar.css";

function ProgressBar({ label, value }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-labels">
        <span>{label}</span>
        <span>{clampedValue}%</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${clampedValue}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;