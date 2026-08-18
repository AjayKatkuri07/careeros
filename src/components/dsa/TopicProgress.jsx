import { TOPICS } from "../../data/dsaConstants.js";
import "./TopicProgress.css";

function TopicProgress({ topicCounts }) {
  const hasAnyProgress = TOPICS.some((topic) => topicCounts[topic] > 0);

  return (
    <section className="card topic-progress">
      <h2>Topic-wise Progress</h2>

      {hasAnyProgress ? (
        <ul className="topic-progress-list">
          {TOPICS.map((topic) => (
            <li key={topic} className="topic-progress-item">
              <span>{topic}</span>
              <span className="topic-progress-count">{topicCounts[topic]} solved</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="career-readiness-empty">Solve a few problems to see topic-wise progress here.</p>
      )}
    </section>
  );
}

export default TopicProgress;