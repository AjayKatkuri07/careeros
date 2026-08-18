import { APPLICATION_STATUSES } from "../../data/applicationConstants.js";
import "./ApplicationCard.css";

function ApplicationCard({ application, onStatusChange, onEdit, onDelete }) {
  return (
    <div className="application-card">
      <div className="application-card-header">
        <span className="application-card-company">{application.company}</span>
        <span className="application-card-role">{application.role}</span>
      </div>

      {application.location && (
        <span className="application-card-location">{application.location}</span>
      )}

      <span className="application-card-date">Applied {application.applicationDate}</span>

      {application.jobUrl && (
        <a
          href={application.jobUrl}
          target="_blank"
          rel="noreferrer"
          className="application-card-link"
        >
          View posting ↗
        </a>
      )}

      <select
        className="application-card-status"
        value={application.status}
        onChange={(e) => onStatusChange(application.id, e.target.value)}
      >
        {APPLICATION_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <div className="application-card-actions">
        <button className="link-button" onClick={() => onEdit(application)}>
          Edit
        </button>
        <button className="link-button link-button-danger" onClick={() => onDelete(application)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;