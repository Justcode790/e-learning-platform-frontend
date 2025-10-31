import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Sidebar() {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const linkClass = (path) => `block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${pathname===path ? 'bg-gray-100 dark:bg-gray-800' : ''}`

  return (
    <aside className="w-56 hidden md:block border-r border-gray-200 dark:border-gray-800 p-3">
      <div className="text-xs uppercase text-gray-500 mb-2">Navigation</div>
      <nav className="space-y-1">
        <Link to="/" className={linkClass('/')}>Home</Link>
        {user?.role === 'teacher' && (
          <>
            <Link to="/teacher" className={linkClass('/teacher')}>Teacher Dashboard</Link>
            <Link to="/create-course" className={linkClass('/create-course')}>Create Course</Link>
          </>
        )}
        {user?.role === 'student' && (
          <Link to="/student" className={linkClass('/student')}>Student Dashboard</Link>
        )}
      </nav>
    </aside>
  )
}


