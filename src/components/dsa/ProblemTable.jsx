import Badge from "../common/Badge.jsx";
import EmptyState from "../common/EmptyState.jsx";
import "./ProblemTable.css";

function ProblemTable({ problems, onEdit, onDelete }) {
  if (problems.length === 0) {
    return <EmptyState message="No problems match your filters." />;
  }

  return (
    <div className="problem-table-wrapper">
      <table className="problem-table">
        <thead>
          <tr>
            <th>Problem</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Platform</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.name}</td>
              <td>{problem.topic}</td>
              <td>
                <Badge text={problem.difficulty} variant={problem.difficulty.toLowerCase()} />
              </td>
              <td>
                <Badge text={problem.status} variant={problem.status.toLowerCase()} />
              </td>
              <td>{problem.platform}</td>
              <td>{problem.date}</td>
              <td>{problem.timeTaken ? `${problem.timeTaken}m` : "—"}</td>
              <td className="problem-table-actions">
                <button className="link-button" onClick={() => onEdit(problem)}>
                  Edit
                </button>
                <button className="link-button link-button-danger" onClick={() => onDelete(problem)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemTable;