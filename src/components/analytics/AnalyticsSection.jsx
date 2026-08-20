import EmptyState from "../common/EmptyState.jsx";
import "./AnalyticsSection.css";

function AnalyticsSection({ title, hasData, children }) {
  return (
    <section className="card analytics-section">
      <h2>{title}</h2>
      {hasData ? (
        children
      ) : (
        <EmptyState message="Not enough data yet. Keep using CareerOS and your analytics will appear here." />
      )}
    </section>
  );
}

export default AnalyticsSection;