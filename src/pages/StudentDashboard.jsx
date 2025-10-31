import { useEffect, useState } from 'react'
import api from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!user) return
    async function getData(){
       const res =  await api.get(`/students/${user.id}`);
       setProfile(res.data);
    }
    getData();
  }, [user])

  if (!profile) return null

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Hello, {profile.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profile.enrolledCourses?.map((c) => (
          <div key={c._id} className="border rounded p-3">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm">Lessons: {c.lessons?.length || 0}</div>
            <Link to={`/courses/${c._id}`} className="text-blue-600 hover:underline text-sm">Continue</Link>
          </div>
        ))}
      </div>
    </div>
  )
}


