import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock3,
  BookOpen,
  Lock,
  Play,
  PlayCircle,
  ShieldCheck,
  SkipForward,
  Star,
  Users,
  Video,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { courses } from "../data/courses.js";

/* =========================================================
   COURSE VIDEO LIBRARY
   Real educational YouTube videos
========================================================= */

const courseVideoLibrary = {
  /* ---------------------------------------------------------
     COURSE 1 - COMPLETE REACT DEVELOPER COURSE
     Verified React course by freeCodeCamp
  --------------------------------------------------------- */

  1: {
    preview: "bMknfKXIFA8",

    lessons: [
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
      "bMknfKXIFA8",
    ],
  },

  /* ---------------------------------------------------------
     COURSE 2 - UI / UX DESIGN
     Verified Figma UI design course
  --------------------------------------------------------- */

  2: {
    preview: "jwCmIBJ8Jtc",

    lessons: [
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
      "jwCmIBJ8Jtc",
    ],
  },

  /* ---------------------------------------------------------
     COURSE 3 - DIGITAL MARKETING
     
     Placeholder educational video ID is kept separate so
     you can replace it later with your preferred marketing
     course without touching the UI.
  --------------------------------------------------------- */

  3: {
    preview: "jfKfPfyJRdk",

    lessons: [
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
      "jfKfPfyJRdk",
    ],
  },

  /* ---------------------------------------------------------
     COURSE 4 - PYTHON / DATA SCIENCE

     Python educational course source.
  --------------------------------------------------------- */

  4: {
    preview: "rfscVS0vtbw",

    lessons: [
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
      "rfscVS0vtbw",
    ],
  },

  /* ---------------------------------------------------------
     COURSE 5 - BUSINESS LEADERSHIP

     Business/leadership demo educational source.
  --------------------------------------------------------- */

  5: {
    preview: "N8dJkjfK8kY",

    lessons: [
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
      "N8dJkjfK8kY",
    ],
  },

  /* ---------------------------------------------------------
     COURSE 6 - MODERN JAVASCRIPT

     Verified freeCodeCamp JavaScript course.
  --------------------------------------------------------- */

  6: {
    preview: "PkZNo7MFNFg",

    lessons: [
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
      "PkZNo7MFNFg",
    ],
  },
};

/* =========================================================
   FALLBACK VIDEO
========================================================= */

const fallbackVideo = "bMknfKXIFA8";

/* =========================================================
   MODULES
========================================================= */

const modules = [
  {
    title: "Introduction & Getting Started",
    lessons: [
      "Welcome to the course",
      "Course overview",
      "Getting started",
      "Understanding the fundamentals",
    ],
  },

  {
    title: "Core Concepts",
    lessons: [
      "Working with practical examples",
      "Building your first project",
      "Common mistakes to avoid",
    ],
  },

  {
    title: "Practical Projects",
    lessons: [
      "Project planning",
      "Building the application",
      "Adding advanced features",
      "Testing and optimization",
    ],
  },

  {
    title: "Advanced Techniques",
    lessons: [
      "Advanced concepts",
      "Professional best practices",
      "Performance optimization",
      "Real-world development workflow",
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = useMemo(
    () =>
      courses.find(
        (item) => String(item.id) === String(id)
      ),
    [id]
  );

  const videoData =
    courseVideoLibrary[String(course?.id)] || {
      preview: fallbackVideo,
      lessons: Array(15).fill(fallbackVideo),
    };

  const [enrolled, setEnrolled] = useState(false);

  const [activeLesson, setActiveLesson] =
    useState(0);

  const [openModule, setOpenModule] =
    useState(0);

  const [showVideo, setShowVideo] =
    useState(false);

  const [isPreview, setIsPreview] =
    useState(false);

  const [completedLessons, setCompletedLessons] =
    useState([]);

  const [showEnrollSuccess, setShowEnrollSuccess] =
    useState(false);

  /* =========================================================
     LOAD SAVED DATA
  ========================================================= */

  useEffect(() => {
    if (!course) return;

    try {
      const savedEnrollment = JSON.parse(
        localStorage.getItem(
          "learnify-enrolled"
        ) || "[]"
      );

      setEnrolled(
        savedEnrollment.includes(
          Number(course.id)
        )
      );

      const savedProgress = JSON.parse(
        localStorage.getItem(
          `learnify-progress-${course.id}`
        ) || "[]"
      );

      setCompletedLessons(
        Array.isArray(savedProgress)
          ? savedProgress
          : []
      );
    } catch {
      setEnrolled(false);
      setCompletedLessons([]);
    }
  }, [course]);

  /* =========================================================
     404
  ========================================================= */

  if (!course) {
    return (
      <main className="not-found">
        <div>
          <span>404</span>

          <h1>Course Not Found</h1>

          <p>
            The course you are looking for
            doesn't exist.
          </p>

          <Link
            to="/courses"
            className="primary-btn"
          >
            Browse Courses
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================================
     COURSE TYPE
  ========================================================= */

  const isFree =
    Number(course.price) === 0 ||
    course.price === "0" ||
    String(course.price).toLowerCase() ===
      "free";

  /* =========================================================
     ALL LESSONS
  ========================================================= */

  const allLessons = modules.flatMap(
    (module, moduleIndex) =>
      module.lessons.map(
        (lesson, lessonIndex) => ({
          title: lesson,
          moduleIndex,
          lessonIndex,
        })
      )
  );

  const currentLesson =
    allLessons[activeLesson];

  const currentVideo =
    videoData.lessons[
      activeLesson %
        videoData.lessons.length
    ] || videoData.preview;

  /* =========================================================
     PROGRESS
  ========================================================= */

  const progress =
    allLessons.length
      ? Math.round(
          (completedLessons.length /
            allLessons.length) *
            100
        )
      : 0;

  /* =========================================================
     COMPLETE LESSON
  ========================================================= */

  const markLessonComplete = () => {
    if (!enrolled) return;

    setCompletedLessons((previous) => {
      if (previous.includes(activeLesson)) {
        return previous;
      }

      const updated = [
        ...previous,
        activeLesson,
      ];

      localStorage.setItem(
        `learnify-progress-${course.id}`,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  /* =========================================================
     FREE ENROLLMENT
  ========================================================= */

  const enrollFreeCourse = () => {
    try {
      const existing = JSON.parse(
        localStorage.getItem(
          "learnify-enrolled"
        ) || "[]"
      );

      const updated = Array.from(
        new Set([
          ...existing,
          Number(course.id),
        ])
      );

      localStorage.setItem(
        "learnify-enrolled",
        JSON.stringify(updated)
      );

      setEnrolled(true);
      setShowEnrollSuccess(true);
    } catch {
      setEnrolled(true);
      setShowEnrollSuccess(true);
    }
  };

  /* =========================================================
     ENROLL / BUY
  ========================================================= */

  const handleEnrollment = () => {
    if (enrolled) {
      setIsPreview(false);
      setShowVideo(true);
      return;
    }

    if (isFree) {
      enrollFreeCourse();
      return;
    }

    navigate(
      `/checkout/${course.id}`
    );
  };

  /* =========================================================
     OPEN LESSON
  ========================================================= */

  const openLesson = (
    lessonIndex,
    preview = false
  ) => {
    if (!preview && !enrolled) {
      return;
    }

    setActiveLesson(lessonIndex);
    setIsPreview(preview);
    setShowVideo(true);
  };

  /* =========================================================
     NEXT LESSON
  ========================================================= */

  const nextLesson = () => {
    markLessonComplete();

    if (
      activeLesson <
      allLessons.length - 1
    ) {
      setActiveLesson(
        activeLesson + 1
      );
    }
  };

  /* =========================================================
     PREVIOUS LESSON
  ========================================================= */

  const previousLesson = () => {
    if (activeLesson > 0) {
      setActiveLesson(
        activeLesson - 1
      );
    }
  };

  /* =========================================================
     CLOSE VIDEO
  ========================================================= */

  const closeVideo = () => {
    if (!isPreview) {
      markLessonComplete();
    }

    setShowVideo(false);
  };

  return (
    <main className="course-details-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="course-details-hero">

        <div className="course-details-hero-inner">

          <Link
            to="/courses"
            className="course-back-link"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>

          <div className="details-hero-grid">

            <div className="details-hero-content">

              <span className="course-detail-category">
                {course.category}
              </span>

              <h1>
                {course.title}
              </h1>

              <p className="details-description">
                Master practical skills with a
                structured, project-based learning
                experience designed to help you
                build real-world confidence.
              </p>

              <div className="detail-rating">

                <Star
                  size={18}
                  fill="currentColor"
                />

                <strong>
                  {course.rating}
                </strong>

                <span>
                  (
                  {Number(
                    course.reviews || 0
                  ).toLocaleString()}{" "}
                  reviews)
                </span>

              </div>

              <p className="created-by">
                Created by{" "}
                <strong>
                  {course.instructor}
                </strong>
              </p>

              <div className="detail-meta">

                <span>
                  <Clock3 size={17} />
                  {course.duration}
                </span>

                <span>
                  <PlayCircle size={17} />
                  {course.lessons} lessons
                </span>

                <span>
                  <Users size={17} />
                  All levels
                </span>

              </div>

            </div>

            {/* =================================================
                ENROLL CARD
            ================================================= */}

            <aside className="enroll-card">

              <div className="detail-image">

                <img
                  src={course.image}
                  alt={course.title}
                />

                <button
                  type="button"
                  className="detail-video-button"
                  onClick={() =>
                    openLesson(0, true)
                  }
                >
                  <span className="detail-video-icon">
                    <Play
                      size={20}
                      fill="currentColor"
                    />
                  </span>

                  Preview Course
                </button>

              </div>

              <div className="enroll-body">

                <div className="detail-price">

                  {isFree ? (
                    <strong className="free-price">
                      FREE
                    </strong>
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

                      {course.oldPrice && (
                        <span className="discount-badge">
                          {Math.round(
                            ((Number(
                              course.oldPrice
                            ) -
                              Number(
                                course.price
                              )) /
                              Number(
                                course.oldPrice
                              )) *
                              100
                          )}
                          % OFF
                        </span>
                      )}
                    </>
                  )}

                </div>

                <button
                  type="button"
                  className={`enroll-btn ${
                    enrolled
                      ? "enrolled-btn"
                      : ""
                  }`}
                  onClick={
                    handleEnrollment
                  }
                >

                  {enrolled ? (
                    <>
                      Continue Learning
                      <ArrowRight
                        size={18}
                      />
                    </>
                  ) : isFree ? (
                    <>
                      Enroll for Free
                      <ArrowRight
                        size={18}
                      />
                    </>
                  ) : (
                    <>
                      Buy Now
                      <ArrowRight
                        size={18}
                      />
                    </>
                  )}

                </button>

                <div className="guarantee">

                  <ShieldCheck
                    size={17}
                  />

                  <span>
                    {isFree
                      ? "Free enrollment • Learn at your own pace"
                      : "30-day money-back guarantee"}
                  </span>

                </div>

                <div className="included-title">
                  This course includes:
                </div>

                <ul className="included-list">

                  <li>
                    <Video size={16} />
                    {course.duration} on-demand video
                  </li>

                  <li>
                    <BookOpen size={16} />
                    {course.lessons} detailed lessons
                  </li>

                  <li>
                    <Award size={16} />
                    Certificate of completion
                  </li>

                  <li>
                    <Users size={16} />
                    Lifetime access
                  </li>

                </ul>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* =====================================================
          COURSE CONTENT
      ===================================================== */}

      <section className="details-content-section">

        <div className="section-container">

          <div className="details-main">

            {/* WHAT YOU LEARN */}

            <div className="details-block">

              <h2>
                What you'll learn
              </h2>

              <div className="learn-grid">

                {[
                  "Build practical real-world projects",
                  "Understand professional development workflows",
                  "Apply concepts through hands-on exercises",
                  "Write cleaner and more maintainable code",
                  "Understand industry best practices",
                  "Build confidence for real projects",
                ].map(
                  (item, index) => (
                    <div
                      className="learn-item"
                      key={index}
                    >
                      <span>
                        <Check size={15} />
                      </span>

                      <p>
                        {item}
                      </p>
                    </div>
                  )
                )}

              </div>

            </div>

            {/* PROGRESS */}

            {enrolled && (
              <div className="course-progress-card">

                <div className="course-progress-top">

                  <div>
                    <span>
                      YOUR PROGRESS
                    </span>

                    <h3>
                      Keep learning
                    </h3>
                  </div>

                  <strong>
                    {progress}%
                  </strong>

                </div>

                <div className="course-progress-track">
                  <span
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p>
                  {completedLessons.length} of{" "}
                  {allLessons.length} lessons
                  completed
                </p>

              </div>
            )}

            {/* CURRICULUM */}

            <div className="details-block">

              <div className="curriculum-heading">

                <div>
                  <h2>
                    Course Curriculum
                  </h2>

                  <p>
                    {modules.length} modules •{" "}
                    {course.lessons} lessons
                  </p>
                </div>

                <button
                  type="button"
                  className="curriculum-preview-all"
                  onClick={() =>
                    setOpenModule(
                      openModule === -1
                        ? null
                        : -1
                    )
                  }
                >
                  {openModule === -1
                    ? "Collapse all"
                    : "Preview all"}
                </button>

              </div>

              <div className="modules">

                {modules.map(
                  (
                    module,
                    moduleIndex
                  ) => {

                    const moduleStart =
                      modules
                        .slice(
                          0,
                          moduleIndex
                        )
                        .reduce(
                          (
                            total,
                            current
                          ) =>
                            total +
                            current.lessons
                              .length,
                          0
                        );

                    const isOpen =
                      openModule ===
                        moduleIndex ||
                      openModule === -1;

                    return (
                      <div
                        className={`module ${
                          isOpen
                            ? "module-open"
                            : ""
                        }`}
                        key={
                          moduleIndex
                        }
                      >

                        <button
                          type="button"
                          className="module-header"
                          onClick={() =>
                            setOpenModule(
                              isOpen &&
                                openModule !==
                                  -1
                                ? null
                                : moduleIndex
                            )
                          }
                        >

                          <div>

                            <strong>
                              Module{" "}
                              {moduleIndex +
                                1}
                            </strong>

                            <span>
                              {
                                module.title
                              }
                            </span>

                          </div>

                          <ChevronDown
                            size={19}
                            className="module-chevron"
                          />

                        </button>

                        {isOpen && (
                          <div className="module-lessons">

                            {module.lessons.map(
                              (
                                lesson,
                                lessonIndex
                              ) => {

                                const globalIndex =
                                  moduleStart +
                                  lessonIndex;

                                const completed =
                                  completedLessons.includes(
                                    globalIndex
                                  );

                                const locked =
                                  !enrolled &&
                                  globalIndex !==
                                    0;

                                return (
                                  <button
                                    type="button"
                                    key={
                                      lessonIndex
                                    }
                                    className={`lesson ${
                                      completed
                                        ? "lesson-completed"
                                        : ""
                                    } ${
                                      locked
                                        ? "lesson-locked"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (!locked) {
                                        openLesson(
                                          globalIndex
                                        );
                                      }
                                    }}
                                  >

                                    <div className="lesson-left">

                                      <span className="lesson-number">

                                        {completed ? (
                                          <CheckCircle2
                                            size={
                                              16
                                            }
                                          />
                                        ) : locked ? (
                                          <Lock
                                            size={
                                              13
                                            }
                                          />
                                        ) : (
                                          globalIndex +
                                          1
                                        )}

                                      </span>

                                      <span>
                                        {
                                          lesson
                                        }
                                      </span>

                                    </div>

                                    <span className="lesson-play">

                                      {locked ? (
                                        <Lock
                                          size={
                                            13
                                          }
                                        />
                                      ) : (
                                        <Play
                                          size={
                                            13
                                          }
                                          fill="currentColor"
                                        />
                                      )}

                                    </span>

                                  </button>
                                );
                              }
                            )}

                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </div>

            {/* INSTRUCTOR */}

            <div className="details-block">

              <h2>
                Meet your instructor
              </h2>

              <div className="instructor-detail-card">

                <div className="instructor-detail-avatar">
                  {course.instructor
                    .split(" ")
                    .map(
                      (name) =>
                        name[0]
                    )
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="course-instructor-detail">

                  <h3>
                    {course.instructor}
                  </h3>

                  <p>
                    Professional instructor
                    & industry specialist
                  </p>

                  <div className="instructor-stats">

                    <span>
                      <Star
                        size={15}
                        fill="currentColor"
                      />
                      {course.rating} rating
                    </span>

                    <span>
                      <Users size={15} />
                      {Number(
                        course.reviews || 0
                      ).toLocaleString()}{" "}
                      students
                    </span>

                    <span>
                      <BookOpen size={15} />
                      {course.category}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* REVIEWS */}

            <div className="details-block course-reviews">

              <h2>
                Student reviews
              </h2>

              <div className="review-summary">

                <div className="review-score">

                  <strong>
                    {course.rating}
                  </strong>

                  <div>
                    <Star
                      size={15}
                      fill="currentColor"
                    />
                    <Star
                      size={15}
                      fill="currentColor"
                    />
                    <Star
                      size={15}
                      fill="currentColor"
                    />
                    <Star
                      size={15}
                      fill="currentColor"
                    />
                    <Star
                      size={15}
                      fill="currentColor"
                    />
                  </div>

                  <span>
                    Course rating
                  </span>

                </div>

                <div className="review-bars">

                  {[5, 4, 3, 2, 1].map(
                    (rating) => (
                      <div
                        className="review-bar"
                        key={rating}
                      >

                        <span>
                          {rating}
                        </span>

                        <div className="review-bar-track">

                          <span
                            className="review-bar-fill"
                            style={{
                              width:
                                rating === 5
                                  ? "88%"
                                  : rating === 4
                                  ? "72%"
                                  : rating === 3
                                  ? "38%"
                                  : rating === 2
                                  ? "15%"
                                  : "7%",
                            }}
                          />

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* CERTIFICATE */}

            <div className="certificate-info-card">

              <div className="certificate-info-icon">
                <Award size={26} />
              </div>

              <div>

                <h3>
                  Earn a certificate
                </h3>

                <p>
                  Complete the course and
                  receive a professional
                  certificate that you can
                  showcase on your profile.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          YOUTUBE VIDEO PLAYER
      ===================================================== */}

      {showVideo && (
        <div
          className="learnify-video-overlay"
          onMouseDown={(event) => {
            if (
              event.target.classList.contains(
                "learnify-video-overlay"
              )
            ) {
              closeVideo();
            }
          }}
        >

          <div className="learnify-video-modal">

            {/* HEADER */}

            <div className="learnify-video-header">

              <div className="learnify-video-title">

                <span>
                  {isPreview
                    ? "COURSE PREVIEW"
                    : `MODULE ${
                        currentLesson
                          ?.moduleIndex + 1
                      }`}
                </span>

                <h2>
                  {isPreview
                    ? course.title
                    : currentLesson?.title}
                </h2>

              </div>

              <button
                type="button"
                className="learnify-video-close"
                onClick={
                  closeVideo
                }
                aria-label="Close video"
              >
                <X size={20} />
              </button>

            </div>

            {/* =================================================
                YOUTUBE VIDEO
            ================================================= */}

            <div className="learnify-video-player">

              <iframe
                key={
                  isPreview
                    ? videoData.preview
                    : currentVideo
                }
                src={`https://www.youtube.com/embed/${
                  isPreview
                    ? videoData.preview
                    : currentVideo
                }?autoplay=1&rel=0`}
                title={
                  isPreview
                    ? `${course.title} Preview`
                    : currentLesson?.title
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>

            {/* FOOTER */}

            <div className="learnify-video-footer">

              <div className="video-footer-left">

                {isPreview ? (
                  <div>

                    <span>
                      FREE PREVIEW
                    </span>

                    <strong>
                      {course.title}
                    </strong>

                  </div>
                ) : (
                  <div>

                    <span>
                      LESSON{" "}
                      {activeLesson + 1}{" "}
                      OF{" "}
                      {allLessons.length}
                    </span>

                    <strong>
                      {currentLesson?.title}
                    </strong>

                  </div>
                )}

              </div>

              {!isPreview &&
                enrolled && (
                  <div className="video-footer-actions">

                    <button
                      type="button"
                      onClick={
                        previousLesson
                      }
                      disabled={
                        activeLesson ===
                        0
                      }
                    >
                      <ChevronLeft
                        size={17}
                      />
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={
                        markLessonComplete
                      }
                      className={
                        completedLessons.includes(
                          activeLesson
                        )
                          ? "completed-video-btn"
                          : ""
                      }
                    >

                      <Check size={16} />

                      {completedLessons.includes(
                        activeLesson
                      )
                        ? "Completed"
                        : "Mark Complete"}

                    </button>

                    <button
                      type="button"
                      onClick={
                        nextLesson
                      }
                      disabled={
                        activeLesson ===
                        allLessons.length -
                          1
                      }
                    >
                      Next
                      <SkipForward
                        size={16}
                      />
                    </button>

                  </div>
                )}

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          FREE ENROLLMENT SUCCESS
      ===================================================== */}

      {showEnrollSuccess && (
        <div className="learnify-video-overlay">

          <div className="enrollment-success-modal">

            <div className="success-check">
              <Check size={30} />
            </div>

            <h2>
              You're enrolled!
            </h2>

            <p>
              You have successfully enrolled
              in{" "}
              <strong>
                {course.title}
              </strong>
              .
            </p>

            <div className="success-actions">

              <button
                type="button"
                className="enroll-btn"
                onClick={() => {
                  setShowEnrollSuccess(
                    false
                  );

                  openLesson(
                    0,
                    false
                  );
                }}
              >
                Start Learning
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="success-secondary-btn"
                onClick={() =>
                  setShowEnrollSuccess(
                    false
                  )
                }
              >
                Continue Browsing
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default CourseDetails;