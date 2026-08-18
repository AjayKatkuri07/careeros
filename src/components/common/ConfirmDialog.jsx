import Modal from "./Modal.jsx";

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="confirm-dialog-message">{message}</p>
      <div className="confirm-dialog-actions">
        <button className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;