import { Link } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Quote,
  Star,
  Users,
} from "lucide-react";

import CourseCard from "../components/CourseCard.jsx";

import {
  courses,
  instructors,
  testimonials,
} from "../data/courses.js";

function Home() {
  const popularCourses = courses.slice(0, 4);

  return (
    <main className="home-page">

      {/* =====================================================
          ADVANCED LEARNIFY OPENING ANIMATION
      ===================================================== */}

      <div className="learnify-loader">

        {/* Animated grid background */}
        <div className="loader-grid"></div>

        {/* Animated glowing lights */}
        <div className="loader-glow loader-glow-one"></div>
        <div className="loader-glow loader-glow-two"></div>

        {/* Animated orbit rings */}
        <div className="loader-orbit loader-orbit-one"></div>
        <div className="loader-orbit loader-orbit-two"></div>
        <div className="loader-orbit loader-orbit-three"></div>

        {/* Learnify animated logo */}
        <div className="loader-core">

          <div className="loader-logo-mark">

            <span className="loader-book-left"></span>

            <span className="loader-book-right"></span>

            <span className="loader-book-line"></span>

          </div>

        </div>

        {/* Brand animation */}
        <div className="loader-brand">

          <span className="loader-brand-main">
            LEARNIFY
          </span>

          <span className="loader-brand-sub">
            ONLINE EDUCATION PLATFORM
          </span>

        </div>

        {/* Loading progress */}
        <div className="loader-progress">
          <span></span>
        </div>

        {/* Loading status */}
        <div className="loader-status">

          <span className="loader-status-dot"></span>

          Preparing your learning experience...

        </div>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-hero">

        <div className="home-container hero-grid">

          {/* LEFT CONTENT */}

          <div className="hero-content">

            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Learn without limits
            </div>

            <h1>
              Build skills that
              <span> move you forward.</span>
            </h1>

            <p className="hero-description">
              Learn practical skills from industry experts through
              engaging courses designed to help you grow your career
              and reach your goals.
            </p>

            <div className="hero-actions">

              <Link
                to="/courses"
                className="primary-btn"
              >
                Explore Courses
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/courses"
                className="hero-watch-btn"
              >
                <span className="hero-play">
                  <PlayCircle size={19} />
                </span>

                Browse Learning
              </Link>

            </div>

            <div className="hero-trust">

              <div className="hero-avatar-stack">

                <img
                  src="https://i.pravatar.cc/80?img=12"
                  alt="Learner"
                />

                <img
                  src="https://i.pravatar.cc/80?img=32"
                  alt="Learner"
                />

                <img
                  src="https://i.pravatar.cc/80?img=47"
                  alt="Learner"
                />

                <span>+</span>

              </div>

              <div>

                <strong>
                  50K+ learners
                </strong>

                <p>
                  Already learning on Learnify
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              HERO VISUAL
          ================================================= */}

          <div className="hero-visual">

            <div className="hero-orbit orbit-one"></div>

            <div className="hero-orbit orbit-two"></div>

            <div className="hero-main-card">

              <div className="hero-image-wrap">

                <video
                  className="hero-learning-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85"
                >
                  <source
                    src="/learning-hero.mp4"
                    type="video/mp4"
                  />

                  Your browser does not support the video element.
                </video>

                <div className="hero-image-overlay"></div>

                <div className="hero-live-card">

                  <span className="live-dot"></span>

                  Live learning

                </div>

              </div>


              {/* COURSE PREVIEW */}

              <div className="hero-course-preview">

                <div>

                  <span>
                    Popular this week
                  </span>

                  <h3>
                    Complete React Developer Course
                  </h3>

                </div>

                <div className="hero-course-rating">

                  <Star
                    size={14}
                    fill="currentColor"
                  />

                  <strong>
                    4.9
                  </strong>

                </div>

              </div>

            </div>


            {/* FLOATING STAT 1 */}

            <div className="floating-stat floating-stat-one">

              <div className="floating-icon">

                <Users size={18} />

              </div>

              <div>

                <strong>
                  12,000+
                </strong>

                <span>
                  Active learners
                </span>

              </div>

            </div>


            {/* FLOATING STAT 2 */}

            <div className="floating-stat floating-stat-two">

              <div className="floating-icon">

                <CheckCircle2 size={18} />

              </div>

              <div>

                <strong>
                  94%
                </strong>

                <span>
                  Completion rate
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="home-stats">

        <div className="home-container stats-grid">

          <div className="stat-item">

            <div className="stat-icon">
              <BookOpen size={21} />
            </div>

            <div>

              <strong>
                500+
              </strong>

              <span>
                Expert Courses
              </span>

            </div>

          </div>


          <div className="stat-item">

            <div className="stat-icon">
              <Users size={21} />
            </div>

            <div>

              <strong>
                50K+
              </strong>

              <span>
                Active Learners
              </span>

            </div>

          </div>


          <div className="stat-item">

            <div className="stat-icon">

              <Star
                size={21}
                fill="currentColor"
              />

            </div>

            <div>

              <strong>
                4.8/5
              </strong>

              <span>
                Average Rating
              </span>

            </div>

          </div>


          <div className="stat-item">

            <div className="stat-icon">

              <CheckCircle2 size={21} />

            </div>

            <div>

              <strong>
                95%
              </strong>

              <span>
                Success Rate
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR COURSES
      ===================================================== */}

      <section className="home-section courses-section">

        <div className="home-container">

          <div className="section-heading">

            <div>

              <span className="section-eyebrow">
                Learn something new
              </span>

              <h2>
                Popular courses
              </h2>

              <p>
                Explore our most-loved courses and start building
                valuable skills today.
              </p>

            </div>


            <Link
              to="/courses"
              className="section-link"
            >
              View all courses

              <ArrowRight size={17} />

            </Link>

          </div>


          <div className="home-course-grid">

            {popularCourses.map((course) => (

              <CourseCard
                key={course.id}
                course={course}
              />

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT / WHY LEARNIFY
      ===================================================== */}

      <section
        id="about"
        className="home-section why-section"
      >

        <div className="home-container why-grid">

          <div className="why-visual">

            <div className="why-image-card">

              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85"
                alt="Students collaborating"
                loading="lazy"
              />


              <div className="why-progress-card">

                <div className="why-progress-top">

                  <span>
                    Learning progress
                  </span>

                  <strong>
                    78%
                  </strong>

                </div>


                <div className="progress-track">

                  <div
                    className="progress-fill"
                    style={{
                      width: "78%",
                    }}
                  ></div>

                </div>


                <small>
                  Keep going — you're doing great!
                </small>

              </div>

            </div>

          </div>


          <div className="why-content">

            <span className="section-eyebrow">
              Why Learnify?
            </span>

            <h2>
              Learning designed
              <span> around you.</span>
            </h2>

            <p>
              We combine expert-led instruction, practical projects,
              and flexible learning to make skill development simple
              and enjoyable.
            </p>


            <div className="benefit-list">

              <div className="benefit-item">

                <div className="benefit-icon">

                  <CheckCircle2 size={20} />

                </div>

                <div>

                  <h3>
                    Learn from experts
                  </h3>

                  <p>
                    Get practical knowledge from experienced
                    professionals.
                  </p>

                </div>

              </div>


              <div className="benefit-item">

                <div className="benefit-icon">

                  <PlayCircle size={20} />

                </div>

                <div>

                  <h3>
                    Learn at your pace
                  </h3>

                  <p>
                    Access your courses anytime and learn whenever
                    it works for you.
                  </p>

                </div>

              </div>


              <div className="benefit-item">

                <div className="benefit-icon">

                  <AwardIcon />

                </div>

                <div>

                  <h3>
                    Earn certificates
                  </h3>

                  <p>
                    Complete courses and showcase your achievements
                    with certificates.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INSTRUCTORS
      ===================================================== */}

      <section className="home-section instructors-section">

        <div className="home-container">

          <div className="section-heading centered-heading">

            <div>

              <span className="section-eyebrow">
                Meet your mentors
              </span>

              <h2>
                Learn from industry experts
              </h2>

              <p>
                Gain insights from professionals who know what it
                takes to succeed.
              </p>

            </div>

          </div>


          <div className="instructor-grid">

            {instructors.slice(0, 4).map((instructor) => (

              <article
                className="instructor-card"
                key={instructor.id}
              >

                <div className="instructor-image">

                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    loading="lazy"
                  />

                </div>


                <div className="instructor-info">

                  <h3>
                    {instructor.name}
                  </h3>

                  <p>
                    {instructor.role}
                  </p>


                  <div className="instructor-meta">

                    <span>

                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      {instructor.rating}

                    </span>


                    <span>

                      <Users size={14} />

                      {instructor.students}

                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="home-section testimonial-section">

        <div className="home-container">

          <div className="section-heading centered-heading">

            <div>

              <span className="section-eyebrow">
                Learner stories
              </span>

              <h2>
                What our learners say
              </h2>

              <p>
                Real experiences from people learning and growing
                with Learnify.
              </p>

            </div>

          </div>


          <div className="testimonial-grid">

            {testimonials.map((testimonial) => (

              <article
                className="testimonial-card"
                key={testimonial.id}
              >

                <div className="quote-icon">

                  <Quote size={20} />

                </div>


                <div className="testimonial-stars">

                  {Array.from({
                    length: 5,
                  }).map((_, index) => (

                    <Star
                      key={index}
                      size={15}
                      fill="currentColor"
                    />

                  ))}

                </div>


                <p className="testimonial-text">

                  "{testimonial.text}"

                </p>


                <div className="testimonial-author">

                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                  />


                  <div>

                    <strong>
                      {testimonial.name}
                    </strong>

                    <span>
                      {testimonial.role}
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT / CTA
      ===================================================== */}

      <section
        id="contact"
        className="home-cta-section"
      >

        <div className="home-container">

          <div className="home-cta">

            <div className="cta-content">

              <span className="section-eyebrow">
                Start your journey
              </span>

              <h2>
                Your next skill
                <br />
                starts today.
              </h2>

              <p>
                Join thousands of learners building the skills
                they need for their future.
              </p>


              <div className="cta-actions">

                <Link
                  to="/courses"
                  className="cta-button"
                >
                  Start Learning

                  <ArrowRight size={18} />

                </Link>


                <Link
                  to="/register"
                  className="cta-button cta-secondary-button"
                >
                  Create Free Account
                </Link>

              </div>

            </div>


            <div className="cta-decoration">

              <div className="cta-circle cta-circle-one"></div>

              <div className="cta-circle cta-circle-two"></div>

              <BookOpen
                size={130}
                strokeWidth={1}
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =====================================================
   AWARD ICON
===================================================== */

function AwardIcon() {
  return (
    <span className="award-icon">
      ★
    </span>
  );
}

export default Home;
