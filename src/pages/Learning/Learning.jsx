import { useAuth } from "../../context/AuthContext.jsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { getDefaultSkills } from "../../data/defaultSkills.js";
import SkillItem from "../../components/learning/SkillItem.jsx";
import "./Learning.css";

function Learning() {
  const { user } = useAuth();
  const [skills, setSkills] = useLocalStorage("learning", getDefaultSkills(user?.targetRole));

  function updateSkill(id, changes) {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, ...changes } : skill))
    );
  }

  return (
    <div className="learning-page">
      <div className="learning-header">
        <h1>Learning Roadmap</h1>
        {user?.targetRole && <p className="learning-role">{user.targetRole}</p>}
      </div>

      <div className="learning-list">
        {skills.map((skill) => (
          <SkillItem key={skill.id} skill={skill} onUpdate={updateSkill} />
        ))}
      </div>
    </div>
  );
}

export default Learning;