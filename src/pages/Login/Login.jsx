import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to continue to CareerOS.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#forgot" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-submit">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <p className="auth-hint">
          Demo login: demo@careeros.com / demo1234
        </p>
      </div>
    </div>
  );
}

export default Login;