import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Award,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock3,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  UserRound,
  X,
  PlayCircle,
  ArrowRight,
} from "lucide-react";

import { courses } from "../data/courses.js";

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activityPeriod, setActivityPeriod] = useState("This week");
  const [showCertificate, setShowCertificate] = useState(false);

  const enrolledIds = JSON.parse(
    localStorage.getItem("learnify-enrolled") || "[]"
  );

  const defaultIds = [courses[0]?.id, courses[1]?.id, courses[3]?.id];

  const ids = enrolledIds.length
    ? enrolledIds
    : defaultIds;

  const enrolledCourses = useMemo(() => {
    return ids
      .map((courseId, index) => {
        const course = courses.find(
          (item) => item.id === courseId
        );

        if (!course) return null;

        const defaultProgress = [72, 45, 28];

        return {
          ...course,
          progress: defaultProgress[index] || 15,
          lastLesson:
            index === 0
              ? "Hooks & State Management"
              : index === 1
              ? "Design Systems"
              : "Data Analysis with Pandas",
        };
      })
      .filter(Boolean);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = enrolledCourses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const scrollToSection = (id) => {
    closeSidebar();

    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const activityData = {
    "This week": [
      35, 60, 45, 82, 56, 72, 42
    ],
    "Last week": [
      48, 35, 68, 55, 42, 61, 38
    ],
    "This month": [
      62, 48, 75, 58, 82, 68, 55
    ],
  };

  const currentActivity =
    activityData[activityPeriod];

  return (
    <main className="dashboard-page">

      {/* SIDEBAR */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        <div className="dashboard-logo">

          <Link to="/" className="brand">

            <span className="brand-icon">
              <BookOpen size={20} />
            </span>

            <span>
              Learn<span>ify</span>
            </span>

          </Link>

          <button
            type="button"
            className="dashboard-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>

        </div>

        {/* USER */}

        <button
          type="button"
          className="sidebar-user"
          onClick={() => scrollToSection("profile")}
          style={{
            border: "none",
            background: "transparent",
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
          }}
        >

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Alex Johnson"
          />

          <div>
            <strong>Alex Johnson</strong>
            <span>Student</span>
          </div>

        </button>

        {/* NAV */}

        <nav className="dashboard-nav">

          <span className="dashboard-nav-label">
            MAIN MENU
          </span>

          <button
            type="button"
            className="dashboard-nav-link active"
            onClick={() => scrollToSection("overview")}
          >
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </button>

          <button
            type="button"
            className="dashboard-nav-link"
            onClick={() => scrollToSection("my-courses")}
          >
            <BookOpen size={19} />
            <span>My Courses</span>
            <small>{enrolledCourses.length}</small>
          </button>

          <button
            type="button"
            className="dashboard-nav-link"
            onClick={() => scrollToSection("wishlist")}
          >
            <Heart size={19} />
            <span>Wishlist</span>
          </button>

          <button
            type="button"
            className="dashboard-nav-link"
            onClick={() => scrollToSection("certificates")}
          >
            <Award size={19} />
            <span>Certificates</span>
          </button>

          <span className="dashboard-nav-label">
            ACCOUNT
          </span>

          <button
            type="button"
            className="dashboard-nav-link"
            onClick={() => scrollToSection("profile")}
          >
            <UserRound size={19} />
            <span>My Profile</span>
          </button>

          <button
            type="button"
            className="dashboard-nav-link"
            onClick={() => scrollToSection("settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        <div className="sidebar-bottom">

          <Link
            to="/"
            className="dashboard-nav-link"
          >
            <LogOut size={19} />
            <span>Back to Website</span>
          </Link>

        </div>

      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* MAIN */}

      <section className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          <div className="dashboard-header-left">

            <button
              type="button"
              className="dashboard-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open dashboard menu"
            >
              <Menu size={23} />
            </button>

            <div>
              <span>Monday, September 18</span>

              <h1>
                Good morning, Alex 👋
              </h1>
            </div>

          </div>

          <div className="dashboard-header-actions">

            {searchOpen && (
              <input
                autoFocus
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search my courses..."
                style={{
                  width: "220px",
                  height: "42px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "0 14px",
                  outline: "none",
                }}
              />
            )}

            <button
              type="button"
              className="dashboard-search"
              onClick={() =>
                setSearchOpen((prev) => !prev)
              }
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <div style={{ position: "relative" }}>

              <button
                type="button"
                className="notification-btn"
                onClick={() =>
                  setNotificationOpen((prev) => !prev)
                }
                aria-label="Notifications"
              >
                <Bell size={19} />
                <i />
              </button>

              {notificationOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "52px",
                    width: "290px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "18px",
                    boxShadow:
                      "0 20px 50px rgba(15,23,42,.14)",
                    zIndex: 100,
                  }}
                >
                  <strong>
                    Notifications
                  </strong>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      lineHeight: 1.6,
                    }}
                  >
                    Your React course is waiting for
                    you. Continue your next lesson.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setNotificationOpen(false);
                      navigate(`/course/${courses[0].id}`);
                    }}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#6366f1",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Continue learning →
                  </button>
                </div>
              )}

            </div>

            <button
              type="button"
              onClick={() => scrollToSection("profile")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img
                className="dashboard-avatar"
                src="https://i.pravatar.cc/100?img=12"
                alt="Alex Johnson"
              />
            </button>

          </div>

        </header>

        {/* CONTENT */}

        <div
          className="dashboard-content"
          id="overview"
        >

          {/* WELCOME */}

          <section className="dashboard-welcome">

            <div>

              <span>Keep going!</span>

              <h2>
                Your learning journey is on track.
              </h2>

              <p>
                You've completed 48% of your
                learning goals this month.
              </p>

            </div>

            <div className="overall-progress">

              <div className="progress-circle">
                <strong>48%</strong>
              </div>

              <span>Monthly goal</span>

            </div>

          </section>

          {/* STATS */}

          <section className="dashboard-stats">

            <div className="dashboard-stat">
              <div className="dashboard-stat-icon">
                <BookOpen size={21} />
              </div>

              <div>
                <strong>
                  {enrolledCourses.length}
                </strong>
                <span>Courses in progress</span>
              </div>
            </div>

            <div className="dashboard-stat">
              <div className="dashboard-stat-icon">
                <Clock3 size={21} />
              </div>

              <div>
                <strong>18.5h</strong>
                <span>Learning this month</span>
              </div>
            </div>

            <div className="dashboard-stat">
              <div className="dashboard-stat-icon">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <strong>7</strong>
                <span>Courses completed</span>
              </div>
            </div>

            <div className="dashboard-stat">
              <div className="dashboard-stat-icon">
                <Award size={21} />
              </div>

              <div>
                <strong>5</strong>
                <span>Certificates earned</span>
              </div>
            </div>

          </section>

          {/* COURSES */}

          <section
            className="dashboard-section"
            id="my-courses"
          >

            <div className="dashboard-section-heading">

              <div>
                <span className="section-label">
                  Continue learning
                </span>

                <h2>My courses</h2>
              </div>

              <button
                type="button"
                onClick={() => navigate("/courses")}
              >
                View all
              </button>

            </div>

            {searchOpen && searchTerm && (
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "18px",
                }}
              >
                Showing results for "
                {searchTerm}"
              </p>
            )}

            <div className="enrolled-grid">

              {filteredCourses.map((course) => (

                <article
                  className="enrolled-card"
                  key={course.id}
                >

                  <div className="enrolled-image">

                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/course/${course.id}`)
                      }
                    >
                      <PlayCircle size={15} />
                      Continue
                    </button>

                  </div>

                  <div className="enrolled-body">

                    <span>{course.category}</span>

                    <h3>{course.title}</h3>

                    <p>
                      Last lesson:{" "}
                      <strong>
                        {course.lastLesson}
                      </strong>
                    </p>

                    <div className="progress-header">
                      <span>Progress</span>
                      <strong>
                        {course.progress}%
                      </strong>
                    </div>

                    <div className="progress-track">
                      <span
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>

                    <Link to={`/course/${course.id}`}>
                      Continue course
                      <ArrowRight size={16} />
                    </Link>

                  </div>

                  <div style={{ position: "relative" }}>

                    <button
                      type="button"
                      className="enrolled-more"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === course.id
                            ? null
                            : course.id
                        )
                      }
                      aria-label="Course options"
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {activeMenu === course.id && (
                      <div
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "45px",
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          padding: "8px",
                          width: "150px",
                          boxShadow:
                            "0 15px 40px rgba(15,23,42,.12)",
                          zIndex: 20,
                        }}
                      >

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(null);
                            navigate(`/course/${course.id}`);
                          }}
                          style={{
                            width: "100%",
                            border: "none",
                            background: "none",
                            padding: "9px",
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          Open course
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(null);
                            localStorage.setItem(
                              "learnify-last-course",
                              String(course.id)
                            );
                          }}
                          style={{
                            width: "100%",
                            border: "none",
                            background: "none",
                            padding: "9px",
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          Save progress
                        </button>

                      </div>
                    )}

                  </div>

                </article>

              ))}

            </div>

            {filteredCourses.length === 0 && (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                No enrolled courses match your search.
              </div>
            )}

          </section>

          {/* LOWER */}

          <div className="dashboard-lower-grid">

            {/* ACTIVITY */}

            <section className="activity-card">

              <div className="dashboard-section-heading">

                <div>
                  <span className="section-label">
                    Your activity
                  </span>

                  <h2>Weekly learning</h2>
                </div>

                <select
                  value={activityPeriod}
                  onChange={(e) =>
                    setActivityPeriod(e.target.value)
                  }
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "8px 10px",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <option>This week</option>
                  <option>Last week</option>
                  <option>This month</option>
                </select>

              </div>

              <div className="chart">

                {currentActivity.map(
                  (height, index) => {

                    const days = [
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                      "Sun",
                    ];

                    return (
                      <div
                        className="chart-column"
                        key={days[index]}
                      >

                        <div className="chart-bar-wrap">

                          <div
                            className={`chart-bar ${
                              index === 3
                                ? "highlight"
                                : ""
                            }`}
                            style={{
                              height: `${height}%`,
                            }}
                          />

                        </div>

                        <span>{days[index]}</span>

                      </div>
                    );
                  }
                )}

              </div>

            </section>

            {/* CERTIFICATE */}

            <section
              className="certificate-card"
              id="certificates"
            >

              <div className="certificate-top">

                <div className="certificate-icon">
                  <Award size={25} />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowCertificate(true)
                  }
                  aria-label="Certificate options"
                >
                  <MoreHorizontal size={19} />
                </button>

              </div>

              <span className="section-label">
                Latest certificate
              </span>

              <h2>
                JavaScript Fundamentals
              </h2>

              <p>
                Congratulations! You successfully
                completed this course.
              </p>

              <div className="certificate-date">
                <CheckCircle2 size={16} />
                Completed September 12, 2026
              </div>

              <button
                type="button"
                className="certificate-btn"
                onClick={() =>
                  setShowCertificate(true)
                }
              >
                View certificate
                <ArrowRight size={17} />
              </button>

            </section>

          </div>

          {/* PROFILE */}

          <section
            id="profile"
            style={{
              marginTop: "30px",
              padding: "28px",
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
            }}
          >
            <span className="section-label">
              Account
            </span>

            <h2>My Profile</h2>

            <p style={{ color: "#64748b" }}>
              Alex Johnson · Student
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                border: "none",
                background: "#111827",
                color: "#fff",
                padding: "11px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Switch account
            </button>
          </section>

          {/* WISHLIST */}

          <section
            id="wishlist"
            style={{
              marginTop: "20px",
              padding: "28px",
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
            }}
          >
            <span className="section-label">
              Saved learning
            </span>

            <h2>Wishlist</h2>

            <p style={{ color: "#64748b" }}>
              Your saved courses will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              style={{
                border: "none",
                background: "#6366f1",
                color: "#fff",
                padding: "11px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Explore courses
            </button>
          </section>

          {/* SETTINGS */}

          <section
            id="settings"
            style={{
              marginTop: "20px",
              padding: "28px",
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
            }}
          >
            <span className="section-label">
              Preferences
            </span>

            <h2>Settings</h2>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#475569",
              }}
            >
              <input type="checkbox" defaultChecked />
              Email notifications
            </label>

          </section>

        </div>

      </section>

      {/* CERTIFICATE MODAL */}

      {showCertificate && (
        <div
          onClick={() => setShowCertificate(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15,23,42,.72)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(650px, 100%)",
              background: "#fff",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
              position: "relative",
              border: "8px solid #eef2ff",
              boxShadow:
                "0 30px 80px rgba(0,0,0,.25)",
            }}
          >

            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              style={{
                position: "absolute",
                right: "18px",
                top: "18px",
                border: "none",
                background: "#f1f5f9",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>

            <Award
              size={55}
              style={{
                margin: "0 auto 15px",
              }}
            />

            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: ".15em",
                fontSize: "12px",
                fontWeight: 800,
                color: "#6366f1",
              }}
            >
              Certificate of Completion
            </span>

            <h1
              style={{
                margin: "14px 0 8px",
              }}
            >
              JavaScript Fundamentals
            </h1>

            <p
              style={{
                color: "#64748b",
                marginBottom: "25px",
              }}
            >
              This certifies that Alex Johnson has
              successfully completed the course.
            </p>

            <strong>
              Learnify · September 12, 2026
            </strong>

            <div
              style={{
                marginTop: "25px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >

              <button
                type="button"
                onClick={() =>
                  window.print()
                }
                style={{
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  padding: "11px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Print Certificate
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowCertificate(false)
                }
                style={{
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  padding: "11px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Dashboard;