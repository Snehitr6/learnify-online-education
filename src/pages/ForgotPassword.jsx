import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] =
    useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    setError("");
    setSubmitted(true);
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
              Secure Account Recovery
            </span>

            <h1>
              Get back to
              <span> learning.</span>
            </h1>

            <p>
              No worries. Enter your registered
              email and we'll help you get back
              into your Learnify account.
            </p>

            <div className="auth-benefits">

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Secure password recovery
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Quick email verification
                </span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>
                  Your account stays protected
                </span>
              </div>

            </div>

          </div>

        </section>

        <section className="auth-card">

          <div className="auth-card-header">

            <div className="auth-card-icon">
              <Mail size={25} />
            </div>

            <h2>Forgot Password?</h2>

            <p>
              Enter your email address and we'll
              send you a password reset link.
            </p>

          </div>

          {!submitted ? (

            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >

              <div className="auth-field">

                <label htmlFor="forgot-email">
                  Email Address
                </label>

                <div
                  className={`auth-input-wrap ${
                    error
                      ? "input-error"
                      : ""
                  }`}
                >

                  <Mail size={18} />

                  <input
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />

                </div>

                {error && (
                  <span className="auth-error">
                    {error}
                  </span>
                )}

              </div>

              <button
                type="submit"
                className="auth-submit"
              >
                Send Reset Link
                <ArrowRight size={18} />
              </button>

              <Link
                to="/login"
                className="auth-back"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>

            </form>

          ) : (

            <div className="auth-success">

              <div className="success-icon">
                <CheckCircle2 size={34} />
              </div>

              <h3>Check your inbox</h3>

              <p>
                We've prepared a password reset
                link for
              </p>

              <strong>{email}</strong>

              <div className="success-note">

                <Mail size={17} />

                <span>
                  Didn't receive the email?
                  Check your spam folder or
                  try again.
                </span>

              </div>

              <button
                type="button"
                className="auth-secondary"
                onClick={() => {
                  setSubmitted(false);
                  setError("");
                }}
              >
                Try Another Email
              </button>

              <button
                type="button"
                className="auth-back"
                onClick={() =>
                  navigate("/login")
                }
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>

            </div>

          )}

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register">
              Create one
            </Link>
          </p>

        </section>

      </div>

    </main>
  );
}

export default ForgotPassword;