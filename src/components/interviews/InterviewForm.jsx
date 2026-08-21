import { useState } from "react";
import { getDefaultChecklist } from "../../data/interviewChecklist.js";
import "./InterviewForm.css";

const EMPTY_INTERVIEW = {
  company: "",
  role: "",
  round: "",
  date: new Date().toISOString().slice(0, 10),
  time: "10:00",
  meetingLink: "",
  notes: "",
};

function InterviewForm({ initialInterview, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialInterview || EMPTY_INTERVIEW);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim() || !formData.date) {
      setError("Company, role, and date are required.");
      return;
    }

    const payload = initialInterview
      ? formData
      : { ...formData, checklist: getDefaultChecklist() };

    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="interview-form">
      {error && <div className="auth-error">{error}</div>}

      <div className="interview-form-row">
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Deloitte"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Java Developer"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="round">Round</label>
        <input
          id="round"
          name="round"
          type="text"
          value={formData.round}
          onChange={handleChange}
          placeholder="e.g. Technical Round 1"
        />
      </div>

      <div className="interview-form-row">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="meetingLink">Meeting Link</label>
        <input
          id="meetingLink"
          name="meetingLink"
          type="url"
          value={formData.meetingLink}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Interviewer name, topics to expect, anything to remember..."
        />
      </div>

      <div className="interview-form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="auth-submit">
          {initialInterview ? "Save Changes" : "Add Interview"}
        </button>
      </div>
    </form>
  );
}

export default InterviewForm;