import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setCoursesOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    setCoursesOpen(false);

    // If already on Home
    if (location.pathname === "/") {
      setTimeout(() => {
        const section = document.getElementById(sectionId);

        if (section) {
          const navbarHeight = 76;

          const sectionPosition =
            section.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

          window.scrollTo({
            top: sectionPosition,
            behavior: "smooth",
          });
        }
      }, 50);

      return;
    }

    // If on another page, go Home first
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        const navbarHeight = 76;

        const sectionPosition =
          section.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        });
      }
    }, 400);
  };

  return (
    <header className="site-navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => {
            setMobileOpen(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <span className="navbar-logo-icon">
            <GraduationCap size={22} strokeWidth={2.4} />
          </span>

          <span className="navbar-logo-text">
            Learn<span>ify</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="navbar-links">

          <Link
            to="/"
            className={`navbar-link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>

          {/* COURSES */}
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}
          >
            <button
              type="button"
              className={`navbar-link navbar-dropdown-button ${
                location.pathname.startsWith("/course")
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("/courses")}
            >
              Courses
              <ChevronDown size={15} />
            </button>

            {coursesOpen && (
              <div className="navbar-dropdown-menu">

                <Link
                  to="/courses"
                  onClick={() => setCoursesOpen(false)}
                >
                  All Courses
                </Link>

                <Link
                  to="/courses"
                  onClick={() => setCoursesOpen(false)}
                >
                  Development
                </Link>

                <Link
                  to="/courses"
                  onClick={() => setCoursesOpen(false)}
                >
                  Design
                </Link>

                <Link
                  to="/courses"
                  onClick={() => setCoursesOpen(false)}
                >
                  Business
                </Link>

                <Link
                  to="/courses"
                  onClick={() => setCoursesOpen(false)}
                >
                  Data Science
                </Link>

              </div>
            )}
          </div>

          {/* ABOUT */}
          <button
            type="button"
            className="navbar-link navbar-section-button"
            onClick={() => scrollToSection("about")}
          >
            About
          </button>

          {/* CONTACT */}
          <button
            type="button"
            className="navbar-link navbar-section-button"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </button>

        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          <Link
            to="/login"
            className="navbar-login"
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            to="/register"
            className="navbar-register"
          >
            <UserPlus size={17} />
            Get Started
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`navbar-mobile-menu ${
          mobileOpen ? "open" : ""
        }`}
      >

        <Link
          to="/"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/courses"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Courses
        </Link>

        <button
          type="button"
          className="mobile-nav-link"
          onClick={() => scrollToSection("about")}
        >
          About
        </button>

        <button
          type="button"
          className="mobile-nav-link"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>

        <div className="mobile-nav-actions">

          <Link
            to="/login"
            className="mobile-login-button"
            onClick={() => setMobileOpen(false)}
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            to="/register"
            className="mobile-register-button"
            onClick={() => setMobileOpen(false)}
          >
            <UserPlus size={17} />
            Login / Register
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;