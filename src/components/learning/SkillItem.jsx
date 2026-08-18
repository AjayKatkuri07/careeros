import { useState } from "react";
import { getSkillLevel } from "../../utils/skillLevel.js";
import "./SkillItem.css";

function SkillItem({ skill, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const level = getSkillLevel(skill.progress);

  function handleProgressChange(e) {
    onUpdate(skill.id, { progress: Number(e.target.value) });
  }

  function handleNotesChange(e) {
    onUpdate(skill.id, { notes: e.target.value });
  }

  return (
    <div className="skill-item">
      <button className="skill-item-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="skill-item-main">
          <span className="skill-item-name">{skill.name}</span>
          <span className={`skill-item-level skill-item-level-${level.toLowerCase()}`}>
            {level}
          </span>
        </div>
        <span className="skill-item-percent">{skill.progress}%</span>
      </button>

      <div className="skill-item-track">
        <div className="skill-item-fill" style={{ width: `${skill.progress}%` }} />
      </div>

      {isOpen && (
        <div className="skill-item-detail">
          <label className="skill-item-field-label">
            Update progress
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={skill.progress}
              onChange={handleProgressChange}
            />
          </label>

          <label className="skill-item-field-label">
            Notes
            <textarea
              rows="3"
              placeholder="What did you learn? What's still confusing?"
              value={skill.notes || ""}
              onChange={handleNotesChange}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default SkillItem;