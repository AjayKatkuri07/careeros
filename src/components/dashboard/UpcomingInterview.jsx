import { getItem } from "../../utils/storage.js";
import EmptyState from "../common/EmptyState.jsx";
import "./UpcomingInterview.css";

function getNextInterview() {
  const interviews = getItem("interviews") || [];
  const upcoming = interviews
    .filter((i) => new Date(i.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return upcoming[0] || null;
}

function UpcomingInterview() {
  const interview = getNextInterview();

  return (
    <section className="card upcoming-interview">
      <h2>Upcoming Interview</h2>

      {interview ? (
        <div className="upcoming-interview-details">
          <span className="upcoming-interview-company">{interview.company}</span>
          <span className="upcoming-interview-role">{interview.role}</span>
          <span className="upcoming-interview-round">{interview.round}</span>
          <span className="upcoming-interview-datetime">
            {interview.date} · {interview.time}
          </span>
        </div>
      ) : (
        <EmptyState message="No upcoming interviews yet." />
      )}
    </section>
  );
}

export default UpcomingInterview;