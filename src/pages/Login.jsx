import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password =
        "Password is required.";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    localStorage.setItem(
      "learnify-user",
      JSON.stringify({
        email: formData.email,
        loggedIn: true,
        rememberMe,
      })
    );

    navigate("/dashboard");
  };

  return (
    <main className="auth-page">

      <div className="auth-background">
        <div className="auth-glow auth-glow-one" />
        <div className="auth-glow auth-glow-two" />
      </div>

      <div className="auth-wrapper">

        <section className="auth-info">

          <Link
            to="/"
            className="auth-brand"
          >
            <span className="auth-brand-icon">
              L
            </span>
            <span>Learnify</span>
          </Link>

          <div className="auth-info-content">

            <span className="auth-eyebrow">
              <ShieldCheck size={16} />
              Welcome back
            </span>

            <h1>
              Continue your
              <span> learning journey.</span>
            </h1>

            <p>
              Sign in to access your courses,
              track your progress, earn certificates,
              and continue learning wherever you are.
            </p>

            <div className="auth-benefits">

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Access your enrolled courses
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Track your learning progress
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Earn and manage certificates
                </span>
              </div>

            </div>

          </div>

        </section>

        <section className="auth-card">

          <div className="auth-card-header">

            <div className="auth-card-icon">
              <LockKeyhole size={25} />
            </div>

            <h2>Welcome back</h2>

            <p>
              Sign in to your Learnify account
              to continue learning.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <div className="auth-field">

              <label htmlFor="login-email">
                Email Address
              </label>

              <div
                className={`auth-input-wrap ${
                  errors.email
                    ? "input-error"
                    : ""
                }`}
              >

                <Mail size={18} />

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

              </div>

              {errors.email && (
                <span className="auth-error">
                  {errors.email}
                </span>
              )}

            </div>

            <div className="auth-field">

              <div className="password-label-row">

                <label htmlFor="login-password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>

              <div
                className={`auth-input-wrap ${
                  errors.password
                    ? "input-error"
                    : ""
                }`}
              >

                <LockKeyhole size={18} />

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <span className="auth-error">
                  {errors.password}
                </span>
              )}

            </div>

            <div className="remember-row">

              <label className="remember-label">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                <span className="custom-checkbox">
                  {rememberMe && "✓"}
                </span>

                <span>Remember me</span>

              </label>

            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Sign In
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>

        </section>

      </div>

    </main>
  );
}

export default Login;