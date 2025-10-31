import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const path = location.pathname;

  const activeTab =
    path === "/"
      ? "home"
      : path === "/about"
      ? "about"
      : path === "/course"
      ? "course"
      : path === "/contact"
      ? "contact"
      : path === "/dashboard"
      ? "dashboard"
      : null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-light bg-white shadow-sm px-4 py-3"
      style={{ position: "sticky", top: "0", zIndex: "100000" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h3
          className="navbar-brand fw-bold text-primary m-0"
          style={{ cursor: "pointer", letterSpacing: "0.5px" }}
          onClick={() => navigate("/")}
        >
          E-Learning Platform
        </h3>

        <ul className="navbar-nav d-flex flex-row gap-3 me-3">
          <li className="nav-item">
            <button
              className={`btn nav-link ${
                activeTab === "home" ? "active text-primary fw-bold" : "text-dark"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn nav-link ${
                activeTab === "course" ? "active text-primary fw-bold" : "text-dark"
              }`}
              onClick={() => navigate("/course")}
            >
              Course
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn nav-link ${
                activeTab === "about" ? "active text-primary fw-bold" : "text-dark"
              }`}
              onClick={() => navigate("/about")}
            >
              About
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn nav-link ${
                activeTab === "contact" ? "active text-primary fw-bold" : "text-dark"
              }`}
              onClick={() => navigate("/contact")}
            >
              Contact
            </button>
          </li>

          {currentUser && (
            <li className="nav-item">
              <button
                className={`btn nav-link ${
                  activeTab === "dashboard"
                    ? "active text-primary fw-bold"
                    : "text-dark"
                }`}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            </li>
          )}
        </ul>

        <div id="auth-section">
          {!currentUser ? (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <span className="fw-bold text-dark">
                Hi, {currentUser.name}
              </span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
