import { useMemo } from "react";
import { generateRecommendations } from "../../utils/recommendations.js";
import "./CareerRecommendations.css";

function CareerRecommendations() {
  const recommendations = useMemo(() => generateRecommendations(), []);

  return (
    <section className="card career-recommendations">
      <h2>Career Recommendations</h2>

      {recommendations.length > 0 ? (
        <ul className="career-recommendations-list">
          {recommendations.map((rec) => (
            <li key={rec.id}>{rec.text}</li>
          ))}
        </ul>
      ) : (
        <p className="career-recommendations-empty">
          You're making steady progress. Nothing urgent right now — keep going.
        </p>
      )}
    </section>
  );
}

export default CareerRecommendations;