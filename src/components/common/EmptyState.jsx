import "./EmptyState.css";

function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <p className="empty-state-message">{message}</p>
      {actionLabel && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;