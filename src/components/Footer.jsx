import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  const currentYear =
    new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">

      <div className="footer-main">

        <div className="footer-container">

          {/* BRAND */}

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
              onClick={scrollTop}
            >
              <span className="footer-logo-icon">
                L
              </span>

              <span>Learnify</span>
            </Link>

            <p>
              Learn new skills, advance your career,
              and achieve your goals with practical
              courses taught by industry experts.
            </p>

            <div className="footer-socials">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="social-facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="social-twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-linkedin"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* PLATFORM */}

          <div className="footer-column">

            <h3>Platform</h3>

            <Link to="/courses">
              Explore Courses
              <ArrowUpRight size={14} />
            </Link>

            <Link to="/dashboard">
              My Dashboard
              <ArrowUpRight size={14} />
            </Link>

            <Link to="/login">
              Login
              <ArrowUpRight size={14} />
            </Link>

            <Link to="/register">
              Create Account
              <ArrowUpRight size={14} />
            </Link>

          </div>

          {/* CATEGORIES */}

          <div className="footer-column">

            <h3>Categories</h3>

            <Link to="/courses">
              Development
            </Link>

            <Link to="/courses">
              Design
            </Link>

            <Link to="/courses">
              Business
            </Link>

            <Link to="/courses">
              Marketing
            </Link>

            <Link to="/courses">
              Data Science
            </Link>

          </div>

          {/* CONTACT */}

          <div className="footer-column footer-contact">

            <h3>Get In Touch</h3>

            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <Mail size={17} />
              </span>

              <div>
                <small>Email</small>

                <a href="mailto:hello@learnify.com">
                  hello@learnify.com
                </a>
              </div>

            </div>

            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <Phone size={17} />
              </span>

              <div>
                <small>Phone</small>

                <a href="tel:+18005550199">
                  +1 (800) 555-0199
                </a>
              </div>

            </div>

            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <MapPin size={17} />
              </span>

              <div>
                <small>Location</small>
                <span>New York, USA</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        <div className="footer-container footer-bottom-inner">

          <p>
            © {currentYear} Learnify.
            All rights reserved.
          </p>

          <div className="footer-legal">

            <Link to="/register">
              Privacy Policy
            </Link>

            <Link to="/register">
              Terms of Service
            </Link>

            <Link to="/register">
              Cookie Policy
            </Link>

            <button
              type="button"
              onClick={scrollTop}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "inherit",
                font: "inherit",
                padding: 0,
              }}
            >
              Back to top ↑
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;