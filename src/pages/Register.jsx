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
  User,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      submit: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Full name is required.";
    } else if (
      formData.name.trim().length < 2
    ) {
      newErrors.name =
        "Please enter a valid name.";
    }

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

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!agree) {
      newErrors.agree =
        "Please accept the terms and privacy policy.";
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
        name: formData.name,
        email: formData.email,
        loggedIn: true,
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
              Start learning today
            </span>

            <h1>
              Invest in your
              <span> future.</span>
            </h1>

            <p>
              Create your free Learnify account
              and get access to expert-led courses,
              practical learning, and tools designed
              to help you grow.
            </p>

            <div className="auth-benefits">

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Access expert-led courses
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Learn at your own pace
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Track your progress and achievements
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Earn certificates when you complete courses
                </span>
              </div>

            </div>

          </div>

        </section>

        <section className="auth-card register-card">

          <div className="auth-card-header">

            <div className="auth-card-icon">
              <User size={25} />
            </div>

            <h2>Create your account</h2>

            <p>
              Join Learnify and start building
              new skills today.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="auth-field">

              <label htmlFor="register-name">
                Full Name
              </label>

              <div
                className={`auth-input-wrap ${
                  errors.name
                    ? "input-error"
                    : ""
                }`}
              >

                <User size={18} />

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />

              </div>

              {errors.name && (
                <span className="auth-error">
                  {errors.name}
                </span>
              )}

            </div>

            {/* EMAIL */}

            <div className="auth-field">

              <label htmlFor="register-email">
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
                  id="register-email"
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

            {/* PASSWORD */}

            <div className="auth-field">

              <label htmlFor="register-password">
                Password
              </label>

              <div
                className={`auth-input-wrap ${
                  errors.password
                    ? "input-error"
                    : ""
                }`}
              >

                <LockKeyhole size={18} />

                <input
                  id="register-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

            {/* CONFIRM */}

            <div className="auth-field">

              <label htmlFor="register-confirm-password">
                Confirm Password
              </label>

              <div
                className={`auth-input-wrap ${
                  errors.confirmPassword
                    ? "input-error"
                    : ""
                }`}
              >

                <LockKeyhole size={18} />

                <input
                  id="register-confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.confirmPassword && (
                <span className="auth-error">
                  {errors.confirmPassword}
                </span>
              )}

            </div>

            {/* TERMS */}

            <div className="register-terms">

              <label className="remember-label">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(
                      e.target.checked
                    );

                    setErrors((prev) => ({
                      ...prev,
                      agree: "",
                    }));
                  }}
                />

                <span className="custom-checkbox">
                  {agree && "✓"}
                </span>

                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      })
                    }
                    style={{
                      border: "none",
                      background: "none",
                      color: "#6366f1",
                      cursor: "pointer",
                      padding: 0,
                      fontWeight: 700,
                    }}
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      })
                    }
                    style={{
                      border: "none",
                      background: "none",
                      color: "#6366f1",
                      cursor: "pointer",
                      padding: 0,
                      fontWeight: 700,
                    }}
                  >
                    Privacy Policy
                  </button>
                </span>

              </label>

              {errors.agree && (
                <span className="auth-error">
                  {errors.agree}
                </span>
              )}

            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </section>

      </div>

    </main>
  );
}

export default Register;