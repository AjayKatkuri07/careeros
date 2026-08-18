import { useState } from "react";
import { DIFFICULTIES, STATUSES, PLATFORMS, TOPICS } from "../../data/dsaConstants.js";
import "./ProblemForm.css";

const EMPTY_PROBLEM = {
  name: "",
  platform: PLATFORMS[0],
  topic: TOPICS[0],
  difficulty: DIFFICULTIES[0],
  status: STATUSES[0],
  timeTaken: "",
  date: new Date().toISOString().slice(0, 10),
  notes: "",
};

function ProblemForm({ initialProblem, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialProblem || EMPTY_PROBLEM);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Problem name is required.");
      return;
    }

    onSubmit({
      ...formData,
      timeTaken: formData.timeTaken ? Number(formData.timeTaken) : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="problem-form">
      {error && <div className="auth-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Problem Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Two Sum"
        />
      </div>

      <div className="problem-form-row">
        <div className="form-group">
          <label htmlFor="platform">Platform</label>
          <select id="platform" name="platform" value={formData.platform} onChange={handleChange}>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <select id="topic" name="topic" value={formData.topic} onChange={handleChange}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="problem-form-row">
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="problem-form-row">
        <div className="form-group">
          <label htmlFor="timeTaken">Time Taken (minutes)</label>
          <input
            id="timeTaken"
            name="timeTaken"
            type="number"
            min="0"
            value={formData.timeTaken}
            onChange={handleChange}
            placeholder="e.g. 25"
          />
        </div>

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
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Approach, mistakes, things to remember..."
        />
      </div>

      <div className="problem-form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="auth-submit">
          {initialProblem ? "Save Changes" : "Add Problem"}
        </button>
      </div>
    </form>
  );
}

export default ProblemForm;