import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Register.css";
import { TARGET_ROLES } from "../../data/targetRoles.js";


function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    targetRole: TARGET_ROLES[0],
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!formData.fullName.trim()) return "Full name is required.";
    if (!formData.email.trim()) return "Email is required.";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return "Please enter a valid email.";

    if (formData.password.length < 6) return "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match.";

    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const result = register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      targetRole: formData.targetRole,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-subtitle">Start tracking your career journey.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetRole">Target Role</label>
            <select
              id="targetRole"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
            >
              {TARGET_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;