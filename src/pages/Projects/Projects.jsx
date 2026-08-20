import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import Modal from "../../components/common/Modal.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import ProjectForm from "../../components/projects/ProjectForm.jsx";
import ProjectCard from "../../components/projects/ProjectCard.jsx";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useLocalStorage("projects", []);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  function handleAddClick() {
    setEditingProject(null);
    setShowForm(true);
  }

  function handleEditClick(project) {
    setEditingProject(project);
    setShowForm(true);
  }

  function handleFormSubmit(formData) {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...formData, id: p.id } : p))
      );
    } else {
      const newProject = { ...formData, id: crypto.randomUUID() };
      setProjects((prev) => [...prev, newProject]);
    }
    setShowForm(false);
    setEditingProject(null);
  }

  function handleConfirmDelete() {
    setProjects((prev) => prev.filter((p) => p.id !== deletingProject.id));
    setDeletingProject(null);
  }

  return (
    <div className="projects-page">
      <div className="projects-page-header">
        <h1>Projects</h1>
        <button className="auth-submit projects-add-button" onClick={handleAddClick}>
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="card">
          <EmptyState
            message="You haven't added any projects yet."
            actionLabel="Add Project"
            onAction={handleAddClick}
          />
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditClick}
              onDelete={setDeletingProject}
            />
          ))}
        </div>
      )}

      {showForm && (
        <Modal
          title={editingProject ? "Edit Project" : "Add Project"}
          onClose={() => setShowForm(false)}
        >
          <ProjectForm
            initialProject={editingProject}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {deletingProject && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to delete "${deletingProject.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProject(null)}
        />
      )}
    </div>
  );
}

export default Projects;