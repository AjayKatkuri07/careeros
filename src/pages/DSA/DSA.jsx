import { useState, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { getDsaStats } from "../../utils/dsaStats.js";
import { DIFFICULTIES, TOPICS } from "../../data/dsaConstants.js";
import Modal from "../../components/common/Modal.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import ProblemForm from "../../components/dsa/ProblemForm.jsx";
import ProblemTable from "../../components/dsa/ProblemTable.jsx";
import DsaStats from "../../components/dsa/DsaStats.jsx";
import TopicProgress from "../../components/dsa/TopicProgress.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import "./DSA.css";

function DSA() {
  const [problems, setProblems] = useLocalStorage("dsa", []);

  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const [showForm, setShowForm] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [deletingProblem, setDeletingProblem] = useState(null);

  const stats = useMemo(() => getDsaStats(problems), [problems]);

  const visibleProblems = useMemo(() => {
    let result = [...problems];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    if (topicFilter !== "All") {
      result = result.filter((p) => p.topic === topicFilter);
    }

    if (difficultyFilter !== "All") {
      result = result.filter((p) => p.difficulty === difficultyFilter);
    }

    result.sort((a, b) => {
      const diff = new Date(a.date) - new Date(b.date);
      return sortOrder === "newest" ? -diff : diff;
    });

    return result;
  }, [problems, searchTerm, topicFilter, difficultyFilter, sortOrder]);

  function handleAddClick() {
    setEditingProblem(null);
    setShowForm(true);
  }

  function handleEditClick(problem) {
    setEditingProblem(problem);
    setShowForm(true);
  }

  function handleFormSubmit(formData) {
    if (editingProblem) {
      setProblems((prev) =>
        prev.map((p) => (p.id === editingProblem.id ? { ...formData, id: p.id } : p))
      );
    } else {
      const newProblem = { ...formData, id: crypto.randomUUID() };
      setProblems((prev) => [...prev, newProblem]);
    }
    setShowForm(false);
    setEditingProblem(null);
  }

  function handleConfirmDelete() {
    setProblems((prev) => prev.filter((p) => p.id !== deletingProblem.id));
    setDeletingProblem(null);
  }

  return (
    <div className="dsa-page">
      <div className="dsa-page-header">
        <h1>DSA Tracker</h1>
        <button className="auth-submit dsa-add-button" onClick={handleAddClick}>
          + Add Problem
        </button>
      </div>

      <DsaStats stats={stats} />

      {problems.length === 0 ? (
        <div className="card">
          <EmptyState
            message="You haven't added any problems yet."
            actionLabel="Add Problem"
            onAction={handleAddClick}
          />
        </div>
      ) : (
        <>
          <div className="dsa-toolbar">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search problems..." />

            <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
              <option value="All">All Topics</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
              <option value="All">All Difficulties</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <ProblemTable
            problems={visibleProblems}
            onEdit={handleEditClick}
            onDelete={setDeletingProblem}
          />

          <TopicProgress topicCounts={stats.topicCounts} />
        </>
      )}

      {showForm && (
        <Modal
          title={editingProblem ? "Edit Problem" : "Add Problem"}
          onClose={() => setShowForm(false)}
        >
          <ProblemForm
            initialProblem={editingProblem}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {deletingProblem && (
        <ConfirmDialog
          title="Delete Problem"
          message={`Are you sure you want to delete "${deletingProblem.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProblem(null)}
        />
      )}
    </div>
  );
}

export default DSA;