import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  BookOpen,
} from "lucide-react";

import CourseCard from "../components/CourseCard.jsx";
import { courses, categories } from "../data/courses.js";

function Courses() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        searchValue === "" ||
        course.title.toLowerCase().includes(searchValue) ||
        course.instructor.toLowerCase().includes(searchValue) ||
        course.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        selectedCategory === "All" ||
        course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "Rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    if (sortBy === "Price: Low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "Price: High") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const getCategoryCount = (category) => {
    if (category === "All") {
      return courses.length;
    }

    return courses.filter(
      (course) => course.category === category
    ).length;
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("Popular");
  };

  return (
    <main className="courses-page">

      {/* =========================================
          COURSES HERO
      ========================================= */}

      <section className="courses-header">
        <div className="section-container">

          <div className="breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <span>Courses</span>
          </div>

          <div className="courses-title">

            <span className="section-label">
              Learn something new
            </span>

            <h1>
              Explore our courses
            </h1>

            <p>
              Find practical courses taught by experts and build
              skills that matter.
            </p>

          </div>

          {/* SEARCH */}

          <div className="course-search">

            <Search size={21} />

            <input
              type="text"
              value={search}
              placeholder="Search courses, instructors, or categories..."
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

          </div>

        </div>
      </section>

      {/* =========================================
          COURSE LIST
      ========================================= */}

      <section className="section courses-list-section">
        <div className="section-container">

          <div className="filter-layout">

            {/* =====================================
                SIDEBAR
            ===================================== */}

            <aside className="filter-sidebar">

              <div className="filter-title">

                <SlidersHorizontal size={19} />

                <strong>
                  Categories
                </strong>

              </div>

              <div className="category-list">

                {categories.map((category) => (

                  <button
                    key={category}
                    type="button"
                    className={
                      selectedCategory === category
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                  >

                    <span>
                      {category}
                    </span>

                    <small>
                      {getCategoryCount(category)}
                    </small>

                  </button>

                ))}

              </div>

            </aside>

            {/* =====================================
                RESULTS
            ===================================== */}

            <div className="courses-results">

              <div className="results-top">

                <div>
                  <strong>
                    {filteredCourses.length}
                  </strong>{" "}
                  {filteredCourses.length === 1
                    ? "course"
                    : "courses"}{" "}
                  found
                </div>

                <label className="sort-select">

                  <span>
                    Sort:
                  </span>

                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                  >
                    <option value="Popular">
                      Popular
                    </option>

                    <option value="Rating">
                      Rating
                    </option>

                    <option value="Price: Low">
                      Price: Low
                    </option>

                    <option value="Price: High">
                      Price: High
                    </option>
                  </select>

                  <ChevronDown size={16} />

                </label>

              </div>

              {/* =================================
                  COURSE GRID
              ================================= */}

              {filteredCourses.length > 0 ? (

                <div className="course-grid">

                  {filteredCourses.map((course) => (

                    <CourseCard
                      key={course.id}
                      course={course}
                    />

                  ))}

                </div>

              ) : (

                /* =================================
                   EMPTY STATE
                ================================= */

                <div className="empty-results">

                  <div className="empty-results-icon">
                    <BookOpen size={30} />
                  </div>

                  <h3>
                    No courses found
                  </h3>

                  <p>
                    We couldn't find any courses matching your
                    search. Try another keyword or category.
                  </p>

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Courses;