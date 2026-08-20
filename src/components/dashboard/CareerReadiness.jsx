import { useCareerScore } from "../../hooks/useCareerScore.js";
import ProgressBar from "../common/ProgressBar.jsx";
import RadialScore from "./RadialScore.jsx";
import "./CareerReadiness.css";

function CareerReadiness() {
  const { overall, breakdown, labels, strongAreas, needsAttention } = useCareerScore();

  return (
    <section className="card career-readiness">
      <div className="career-readiness-header">
        <h2>Career Readiness</h2>
      </div>

      <div className="career-readiness-top">
        <RadialScore score={overall} />

        <div className="career-readiness-breakdown">
          {Object.keys(breakdown).map((key) => (
            <ProgressBar key={key} label={labels[key]} value={breakdown[key]} />
          ))}
        </div>
      </div>

      <div className="career-readiness-notes">
        <div>
          <h3>Strong Areas</h3>
          {strongAreas.length > 0 ? (
            <ul>
              {strongAreas.map((area) => (
                <li key={area}>✓ {area}</li>
              ))}
            </ul>
          ) : (
            <p className="career-readiness-empty">Keep going — nothing here yet.</p>
          )}
        </div>

        <div>
          <h3>Needs Attention</h3>
          {needsAttention.length > 0 ? (
            <ul>
              {needsAttention.map((area) => (
                <li key={area}>⚠ {area}</li>
              ))}
            </ul>
          ) : (
            <p className="career-readiness-empty">Nothing urgent right now.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CareerReadiness;