import ProfileForm from "../../components/settings/ProfileForm.jsx";
import ThemeSetting from "../../components/settings/ThemeSetting.jsx";
import DangerZone from "../../components/settings/DangerZone.jsx";
import "./Settings.css";

function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <section className="card settings-section">
        <h2>Profile</h2>
        <ProfileForm />
      </section>

      <section className="card settings-section">
        <h2>Appearance</h2>
        <ThemeSetting />
      </section>

      <section className="card settings-section settings-section-danger">
        <h2>Danger Zone</h2>
        <DangerZone />
      </section>
    </div>
  );
}

export default Settings;