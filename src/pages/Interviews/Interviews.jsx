import { useState, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { groupInterviews } from "../../utils/interviewGrouping.js";
import Modal from "../../components/common/Modal.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import InterviewForm from "../../components/interviews/InterviewForm.jsx";
import InterviewGroup from "../../components/interviews/InterviewGroup.jsx";
import "./Interviews.css";

function Interviews() {
  const [interviews, setInterviews] = useLocalStorage("interviews", []);

  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [deletingInterview, setDeletingInterview] = useState(null);

  const groups = useMemo(() => groupInterviews(interviews), [interviews]);

  function handleAddClick() {
    setEditingInterview(null);
    setShowForm(true);
  }

  function handleEditClick(interview) {
    setEditingInterview(interview);
    setShowForm(true);
  }

  function handleFormSubmit(formData) {
    if (editingInterview) {
      setInterviews((prev) =>
        prev.map((i) => (i.id === editingInterview.id ? { ...formData, id: i.id } : i))
      );
    } else {
      const newInterview = { ...formData, id: crypto.randomUUID() };
      setInterviews((prev) => [...prev, newInterview]);
    }
    setShowForm(false);
    setEditingInterview(null);
  }

  function handleToggleChecklistItem(interviewId, itemId) {
    setInterviews((prev) =>
      prev.map((interview) => {
        if (interview.id !== interviewId) return interview;

        return {
          ...interview,
          checklist: interview.checklist.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          ),
        };
      })
    );
  }

  function handleConfirmDelete() {
    setInterviews((prev) => prev.filter((i) => i.id !== deletingInterview.id));
    setDeletingInterview(null);
  }

  return (
    <div className="interviews-page">
      <div className="interviews-page-header">
        <h1>Interviews</h1>
        <button className="auth-submit interviews-add-button" onClick={handleAddClick}>
          + Add Interview
        </button>
      </div>

      {interviews.length === 0 ? (
        <div className="card">
          <EmptyState
            message="No interviews scheduled yet."
            actionLabel="Add Interview"
            onAction={handleAddClick}
          />
        </div>
      ) : (
        <div className="interviews-groups">
          <InterviewGroup
            title="Today"
            interviews={groups.today}
            onToggleChecklistItem={handleToggleChecklistItem}
            onEdit={handleEditClick}
            onDelete={setDeletingInterview}
          />
          <InterviewGroup
            title="Tomorrow"
            interviews={groups.tomorrow}
            onToggleChecklistItem={handleToggleChecklistItem}
            onEdit={handleEditClick}
            onDelete={setDeletingInterview}
          />
          <InterviewGroup
            title="This Week"
            interviews={groups.thisWeek}
            onToggleChecklistItem={handleToggleChecklistItem}
            onEdit={handleEditClick}
            onDelete={setDeletingInterview}
          />
          <InterviewGroup
            title="Upcoming"
            interviews={groups.upcoming}
            onToggleChecklistItem={handleToggleChecklistItem}
            onEdit={handleEditClick}
            onDelete={setDeletingInterview}
          />
          <InterviewGroup
            title="Completed"
            interviews={groups.completed}
            onToggleChecklistItem={handleToggleChecklistItem}
            onEdit={handleEditClick}
            onDelete={setDeletingInterview}
          />
        </div>
      )}

      {showForm && (
        <Modal
          title={editingInterview ? "Edit Interview" : "Add Interview"}
          onClose={() => setShowForm(false)}
        >
          <InterviewForm
            initialInterview={editingInterview}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {deletingInterview && (
        <ConfirmDialog
          title="Delete Interview"
          message={`Are you sure you want to delete the interview with ${deletingInterview.company}?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingInterview(null)}
        />
      )}
    </div>
  );
}

export default Interviews;