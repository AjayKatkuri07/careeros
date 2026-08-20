import "./RadialScore.css";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function RadialScore({ score }) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE - (clampedScore / 100) * CIRCUMFERENCE;

  return (
    <div className="radial-score">
      <svg viewBox="0 0 120 120" className="radial-score-svg">
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          className="radial-score-track"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          className="radial-score-fill"
          strokeWidth="10"
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="radial-score-text">
        <span className="radial-score-number">{clampedScore}</span>
        <span className="radial-score-max">/ 100</span>
      </div>
    </div>
  );
}

export default RadialScore;