import { APPLICATION_STATUSES } from "../../data/applicationConstants.js";
import ApplicationCard from "./ApplicationCard.jsx";
import "./KanbanBoard.css";

function KanbanBoard({ applications, onStatusChange, onEdit, onDelete }) {
  return (
    <div className="kanban-board">
      {APPLICATION_STATUSES.map((status) => {
        const columnApplications = applications.filter((a) => a.status === status);

        return (
          <div key={status} className="kanban-column">
            <div className="kanban-column-header">
              <span>{status}</span>
              <span className="kanban-column-count">{columnApplications.length}</span>
            </div>

            <div className="kanban-column-cards">
              {columnApplications.length === 0 ? (
                <p className="kanban-column-empty">No applications here.</p>
              ) : (
                columnApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;