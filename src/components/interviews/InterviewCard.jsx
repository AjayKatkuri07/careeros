import { useState } from "react";
import PrepChecklist from "./PrepChecklist.jsx";
import "./InterviewCard.css";

function InterviewCard({ interview, onToggleChecklistItem, onEdit, onDelete }) {
  const [showChecklist, setShowChecklist] = useState(false);

  function handleToggle(itemId) {
    onToggleChecklistItem(interview.id, itemId);
  }

  return (
    <div className="interview-card">
      <div className="interview-card-header">
        <div>
          <span className="interview-card-company">{interview.company}</span>
          <span className="interview-card-role">{interview.role}</span>
        </div>
        <span className="interview-card-datetime">
          {interview.date} · {interview.time}
        </span>
      </div>

      {interview.round && <span className="interview-card-round">{interview.round}</span>}

      {interview.notes && <p className="interview-card-notes">{interview.notes}</p>}

      <div className="interview-card-actions">
        {interview.meetingLink && (
          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="link-button"
          >
            Join Meeting ↗
          </a>
        )}
        <button className="link-button" onClick={() => setShowChecklist(!showChecklist)}>
          {showChecklist ? "Hide Checklist" : "Prep Checklist"}
        </button>
        <button className="link-button" onClick={() => onEdit(interview)}>
          Edit
        </button>
        <button className="link-button link-button-danger" onClick={() => onDelete(interview)}>
          Delete
        </button>
      </div>

      {showChecklist && (
        <PrepChecklist checklist={interview.checklist || []} onToggle={handleToggle} />
      )}
    </div>
  );
}

export default InterviewCard;