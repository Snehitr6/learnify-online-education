import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Clock3,
  PlayCircle,
  Star,
  Users,
  BadgeCheck,
} from "lucide-react";

function CourseCard({ course }) {
  if (!course) return null;

  const isFree = course.isFree || Number(course.price) === 0;

  return (
    <article className={`course-card ${isFree ? "free-course-card" : "pro-course-card"}`}>

      {/* IMAGE */}
      <Link
        to={`/course/${course.id}`}
        className="course-image-wrap"
      >
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
        />

        <div className="course-top-badges">
          <span className="course-category">
            {course.category}
          </span>

          <span
            className={`course-access-badge ${
              isFree ? "free-badge" : "pro-badge"
            }`}
          >
            {isFree ? (
              <>
                <BadgeCheck size={12} />
                FREE
              </>
            ) : (
              <>
                <BadgeCheck size={12} />
                PRO
              </>
            )}
          </span>
        </div>

        <span
          className="course-play"
          aria-label={`Preview ${course.title}`}
        >
          <PlayCircle size={19} />
        </span>
      </Link>

      {/* CONTENT */}
      <div className="course-content">

        {/* RATING */}
        <div className="course-rating">
          <Star
            size={15}
            fill="currentColor"
          />

          <strong>
            {course.rating}
          </strong>

          <span>
            ({course.reviews.toLocaleString()})
          </span>
        </div>

        {/* TITLE */}
        <Link
          to={`/course/${course.id}`}
          className="course-title-link"
        >
          <h3>
            {course.title}
          </h3>
        </Link>

        {/* INSTRUCTOR */}
        <p className="course-instructor">
          By {course.instructor}
        </p>

        {/* META */}
        <div className="course-meta">

          <span>
            <Clock3 size={15} />
            {course.duration}
          </span>

          <span>
            <PlayCircle size={15} />
            {course.lessons} lessons
          </span>

        </div>

        {/* STUDENTS */}
        <div className="course-students">
          <Users size={14} />
          <span>
            {course.students} learners
          </span>

          <span className="course-level">
            {course.level}
          </span>
        </div>

        {/* PRICE */}
        <div className="course-bottom">

          <div className="course-price-area">

            {isFree ? (
              <>
                <strong className="free-price">
                  Free
                </strong>

                <span className="free-access-text">
                  Full access
                </span>
              </>
            ) : (
              <>
                <strong>
                  ${course.price}
                </strong>

                {course.oldPrice && (
                  <del>
                    ${course.oldPrice}
                  </del>
                )}
              </>
            )}

          </div>

          <Link
            to={`/course/${course.id}`}
            className={`course-arrow ${
              isFree
                ? "free-course-arrow"
                : "pro-course-arrow"
            }`}
            aria-label={`View ${course.title}`}
          >
            <ArrowUpRight size={19} />
          </Link>

        </div>

        {/* ACCESS TEXT */}
        <div
          className={`course-access-text ${
            isFree
              ? "course-access-free"
              : "course-access-pro"
          }`}
        >
          {isFree
            ? "✓ Enroll instantly — no payment required"
            : "Premium course · Secure checkout"}
        </div>

      </div>
    </article>
  );
}

export default CourseCard;