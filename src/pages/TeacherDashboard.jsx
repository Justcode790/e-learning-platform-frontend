import { useEffect, useState } from 'react'
import api from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    if (!user) return
    api.get('/courses', { params: { teacherId: user.id } }).then(({ data }) => setCourses(data))
  }, [user])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.name}</h1>
      <div className="mb-4">
        <Link to="/create-course" className="px-3 py-2 rounded bg-blue-600 text-white">Create Course</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="border rounded p-3">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm">{c.category}</div>
            <Link to={`/courses/${c._id}`} className="text-blue-600 hover:underline text-sm">Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}


