import InterviewCard from "./InterviewCard.jsx";

function InterviewGroup({ title, interviews, onToggleChecklistItem, onEdit, onDelete }) {
  if (interviews.length === 0) return null;

  return (
    <section className="interview-group">
      <h2 className="interview-group-title">{title}</h2>
      <div className="interview-group-list">
        {interviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            onToggleChecklistItem={onToggleChecklistItem}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default InterviewGroup;