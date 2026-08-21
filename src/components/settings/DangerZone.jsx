import { useState } from "react";
import { clearProgressData } from "../../utils/storage.js";
import ConfirmDialog from "../common/ConfirmDialog.jsx";
import "./DangerZone.css";

function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);

  function handleConfirm() {
    clearProgressData();
    window.location.reload();
  }

  return (
    <div className="danger-zone">
      <div>
        <span className="danger-zone-label">Clear All Progress Data</span>
        <p className="danger-zone-description">
          Removes your Learning, DSA, Applications, Interviews, Projects, and Tasks data.
          Your account and login stay unaffected.
        </p>
      </div>
      <button className="btn-danger" onClick={() => setShowConfirm(true)}>
        Clear Data
      </button>

      {showConfirm && (
        <ConfirmDialog
          title="Clear All Progress Data"
          message="This permanently deletes all your Learning, DSA, Applications, Interviews, Projects, and Tasks data. This cannot be undone. Your account will stay logged in."
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default DangerZone;