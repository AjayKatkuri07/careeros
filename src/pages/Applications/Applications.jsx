import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import Modal from "../../components/common/Modal.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import ApplicationForm from "../../components/applications/ApplicationForm.jsx";
import KanbanBoard from "../../components/applications/KanbanBoard.jsx";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useLocalStorage("applications", []);

  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [deletingApplication, setDeletingApplication] = useState(null);

  function handleAddClick() {
    setEditingApplication(null);
    setShowForm(true);
  }

  function handleEditClick(application) {
    setEditingApplication(application);
    setShowForm(true);
  }

  function handleFormSubmit(formData) {
    if (editingApplication) {
      setApplications((prev) =>
        prev.map((a) => (a.id === editingApplication.id ? { ...formData, id: a.id } : a))
      );
    } else {
      const newApplication = { ...formData, id: crypto.randomUUID() };
      setApplications((prev) => [...prev, newApplication]);
    }
    setShowForm(false);
    setEditingApplication(null);
  }

  function handleStatusChange(id, newStatus) {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  }

  function handleConfirmDelete() {
    setApplications((prev) => prev.filter((a) => a.id !== deletingApplication.id));
    setDeletingApplication(null);
  }

  return (
    <div className="applications-page">
      <div className="applications-page-header">
        <h1>Job Applications</h1>
        <button className="auth-submit applications-add-button" onClick={handleAddClick}>
          + Add Application
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="card">
          <EmptyState
            message="No applications yet. Start tracking your job applications here."
            actionLabel="Add Application"
            onAction={handleAddClick}
          />
        </div>
      ) : (
        <KanbanBoard
          applications={applications}
          onStatusChange={handleStatusChange}
          onEdit={handleEditClick}
          onDelete={setDeletingApplication}
        />
      )}

      {showForm && (
        <Modal
          title={editingApplication ? "Edit Application" : "Add Application"}
          onClose={() => setShowForm(false)}
        >
          <ApplicationForm
            initialApplication={editingApplication}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {deletingApplication && (
        <ConfirmDialog
          title="Delete Application"
          message={`Are you sure you want to delete the application to ${deletingApplication.company}?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingApplication(null)}
        />
      )}
    </div>
  );
}

export default Applications;