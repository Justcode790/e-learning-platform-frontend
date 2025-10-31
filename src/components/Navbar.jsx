import { Link,useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user,logout } = useAuth();
  // const navigate = useNavigate();

  // function handleLogout(){
  //   // const {logout} = useAuth();
  //   navigate("/");
  // }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">E-Learning</Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className="hover:underline">Home</Link>
          {!user && (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
          {user && user.role === 'teacher' && (
            <>
              <Link to="/teacher" className="hover:underline">Dashboard</Link>
              <Link to="/create-course" className="hover:underline">Create Course</Link>
            </>
          )}
          {user && user.role === 'student' && (
            <Link to="/student" className="hover:underline">My Courses</Link>
          )}
          {user && (
            <button onClick={logout} className="text-sm rounded px-2 py-1 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">Logout</button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}


