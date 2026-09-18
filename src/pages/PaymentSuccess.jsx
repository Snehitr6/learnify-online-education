import { useEffect } from "react";
import {
  ArrowRight,
  Award,
  Check,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { courses } from "../data/courses.js";

function PaymentSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find(
    (item) => String(item.id) === String(id)
  );

  useEffect(() => {
    if (!course) {
      navigate("/courses");
    }
  }, [course, navigate]);

  if (!course) return null;

  return (
    <main className="payment-success-page">

      <div className="success-background-orb orb-one" />
      <div className="success-background-orb orb-two" />

      <section className="payment-success-card">

        <div className="success-icon-wrap">
          <div className="success-icon">
            <Check size={38} strokeWidth={2.5} />
          </div>

          <span className="success-sparkle sparkle-one">
            <Sparkles size={15} />
          </span>

          <span className="success-sparkle sparkle-two">
            <Sparkles size={12} />
          </span>
        </div>

        <span className="success-eyebrow">
          PAYMENT SUCCESSFUL
        </span>

        <h1>
          Welcome to your
          <br />
          learning journey!
        </h1>

        <p className="success-description">
          Your enrollment for{" "}
          <strong>{course.title}</strong>{" "}
          is confirmed. You can start learning
          right away.
        </p>

        <div className="success-course">

          <img
            src={course.image}
            alt={course.title}
          />

          <div>
            <span>{course.category}</span>
            <h3>{course.title}</h3>
            <p>
              By {course.instructor}
            </p>
          </div>

          <div className="success-check-small">
            <Check size={16} />
          </div>

        </div>

        <div className="success-info-grid">

          <div>
            <Clock3 size={18} />
            <span>
              <strong>
                {course.duration}
              </strong>
              Course duration
            </span>
          </div>

          <div>
            <Award size={18} />
            <span>
              <strong>
                Certificate
              </strong>
              Included
            </span>
          </div>

          <div>
            <ShieldCheck size={18} />
            <span>
              <strong>
                Lifetime
              </strong>
              Access
            </span>
          </div>

        </div>

        <div className="success-actions">

          <Link
            to="/dashboard"
            className="success-primary-btn"
          >
            Start Learning
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/courses"
            className="success-secondary-btn"
          >
            Browse More Courses
          </Link>

        </div>

        <p className="success-footer">
          Your course has been added to your
          Learnify dashboard.
        </p>

      </section>

    </main>
   );
}

export default PaymentSuccess;