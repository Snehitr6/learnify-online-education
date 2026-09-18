import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";

function MainLayout({ children }) {
  return (
    <div className="learnify-app">
      <Navbar />

      <div className="learnify-page-content">
        {children}
      </div>

      <Footer />
    </div>
  );
}

function StandaloneLayout({ children }) {
  return (
    <div className="learnify-app learnify-standalone">
      {children}
    </div>
  );
}

function NotFound() {
  return (
    <MainLayout>
      <section className="not-found">
        <div>
          <span>404</span>
          <h1>Page Not Found</h1>
          <p>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link to="/" className="primary-btn">
            Back Home
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

function App() {
  return (
    <Routes>
      {/* Main website */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/courses"
        element={
          <MainLayout>
            <Courses />
          </MainLayout>
        }
      />

      <Route
        path="/course/:id"
        element={
          <MainLayout>
            <CourseDetails />
          </MainLayout>
        }
      />

      {/* Standalone pages */}
      <Route
        path="/checkout/:id"
        element={
          <StandaloneLayout>
            <Checkout />
          </StandaloneLayout>
        }
      />

      <Route
        path="/payment-success/:id"
        element={
          <StandaloneLayout>
            <PaymentSuccess />
          </StandaloneLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <StandaloneLayout>
            <Dashboard />
          </StandaloneLayout>
        }
      />

      <Route
        path="/login"
        element={
          <StandaloneLayout>
            <Login />
          </StandaloneLayout>
        }
      />

      <Route
        path="/register"
        element={
          <StandaloneLayout>
            <Register />
          </StandaloneLayout>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <StandaloneLayout>
            <ForgotPassword />
          </StandaloneLayout>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;