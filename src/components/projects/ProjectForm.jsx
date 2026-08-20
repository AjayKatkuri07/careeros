import { useState } from "react";
import { PROJECT_STATUSES } from "../../data/projectConstants.js";
import "./ProjectForm.css";

const EMPTY_PROJECT = {
  name: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  status: "Planning",
  progress: 0,
};

function ProjectForm({ initialProject, onSubmit, onCancel }) {
  const initialFormState = initialProject
    ? { ...initialProject, techStack: initialProject.techStack.join(", ") }
    : EMPTY_PROJECT;

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Project name is required.");
      return;
    }

    const techStackArray = formData.techStack
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    onSubmit({
      ...formData,
      techStack: techStackArray,
      progress: Number(formData.progress),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="project-form">
      {error && <div className="auth-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Project Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. CareerOS"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="What does this project do?"
        />
      </div>

      <div className="form-group">
        <label htmlFor="techStack">Tech Stack</label>
        <input
          id="techStack"
          name="techStack"
          type="text"
          value={formData.techStack}
          onChange={handleChange}
          placeholder="React, Vite, CSS (comma separated)"
        />
      </div>

      <div className="project-form-row">
        <div className="form-group">
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="liveUrl">Live URL</label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="project-form-row">
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="progress">Progress ({formData.progress}%)</label>
          <input
            id="progress"
            name="progress"
            type="range"
            min="0"
            max="100"
            step="5"
            value={formData.progress}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="project-form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="auth-submit">
          {initialProject ? "Save Changes" : "Add Project"}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;