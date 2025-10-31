import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Zap } from 'lucide-react' // Added for an "eyecatchy" logo

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Updated logout handler to navigate user back to home
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // --- Reusable Button Styles ---
  const navLinkStyle = "text-sm font-medium text-gray-600 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
  const primaryButtonStyle = "inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
  const secondaryButtonStyle = "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* --- Left Side: Logo & Main Nav --- */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-teal-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Learnify
            </span>
          </Link>

          {/* Main Navigation Links */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/" className={navLinkStyle}>
              Home
            </Link>

            {user && user.role === 'teacher' && (
              <>
                <Link to="/teacher" className={navLinkStyle}>
                  Dashboard
                </Link>
                <Link to="/create-course" className={navLinkStyle}>
                  Create Course
                </Link>
              </>
            )}

            {user && user.role === 'student' && (
              <Link to="/student" className={navLinkStyle}>
                My Courses
              </Link>
            )}
          </nav>
        </div>

        {/* --- Right Side: Actions (Theme, Auth) --- */}
        <div className="flex items-center gap-4">
          {/* <ThemeToggle /> */}

          {!user ? (
            // --- Guest View ---
            <>
              <Link to="/login" className={navLinkStyle}>
                Login
              </Link>
              <Link to="/register" className={primaryButtonStyle}>
                Register
              </Link>
            </>
          ) : (
            // --- Logged-in View ---
            <button onClick={handleLogout} className={secondaryButtonStyle}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}