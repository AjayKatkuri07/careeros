import "./Modal.css";

function Modal({ title, onClose, children }) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;