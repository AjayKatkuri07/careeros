import Badge from "../common/Badge.jsx";
import "./ProjectCard.css";

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <span className="project-card-name">{project.name}</span>
        <Badge text={project.status} variant="attempted" />
      </div>

      {project.description && (
        <p className="project-card-description">{project.description}</p>
      )}

      {project.techStack.length > 0 && (
        <div className="project-card-tags">
          {project.techStack.map((tech) => (
            <span key={tech} className="project-card-tag">{tech}</span>
          ))}
        </div>
      )}

      <div className="project-card-progress-track">
        <div
          className="project-card-progress-fill"
          style={{ width: `${project.progress}%` }}
        />
      </div>
      <span className="project-card-progress-label">{project.progress}% complete</span>

      <div className="project-card-links">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="link-button">
            GitHub ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="link-button">
            Live Demo ↗
          </a>
        )}
      </div>

      <div className="project-card-actions">
        <button className="link-button" onClick={() => onEdit(project)}>
          Edit
        </button>
        <button className="link-button link-button-danger" onClick={() => onDelete(project)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;