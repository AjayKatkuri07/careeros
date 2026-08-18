import { useState } from "react";
import { APPLICATION_STATUSES } from "../../data/applicationConstants.js";
import "./ApplicationForm.css";

const EMPTY_APPLICATION = {
  company: "",
  role: "",
  location: "",
  applicationDate: new Date().toISOString().slice(0, 10),
  jobUrl: "",
  notes: "",
  status: "Applied",
};

function ApplicationForm({ initialApplication, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialApplication || EMPTY_APPLICATION);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      setError("Company and role are required.");
      return;
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="application-form">
      {error && <div className="auth-error">{error}</div>}

      <div className="application-form-row">
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

      <div className="application-form-row">
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Hyderabad / Remote"
          />
        </div>

        <div className="form-group">
          <label htmlFor="applicationDate">Application Date</label>
          <input
            id="applicationDate"
            name="applicationDate"
            type="date"
            value={formData.applicationDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="jobUrl">Job URL</label>
        <input
          id="jobUrl"
          name="jobUrl"
          type="url"
          value={formData.jobUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Referral, recruiter contact, follow-up plan..."
        />
      </div>

      <div className="application-form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="auth-submit">
          {initialApplication ? "Save Changes" : "Add Application"}
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;