import { useEffect, useState } from 'react'
import api from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

function DashboardLoadingSkeleton() {
  return (
    <div>
      <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 animate-pulse"></div>
      <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-5 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 animate-pulse"
          >
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
            <div className="h-11 w-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    async function getData() {
      try {
        setLoading(true)
        const res = await api.get(`/students/${user.id}`)
        setProfile(res.data)
      } catch (error) {
        console.error("Failed to fetch student profile:", error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [user])

  if (loading) return <DashboardLoadingSkeleton />

  if (!profile) return <div className="text-center mt-10 text-red-500">Could not load your profile.</div>

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Hello, {profile.name}!
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-5">
        Your Enrolled Courses
      </h2>

      {profile.enrolledCourses && profile.enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.enrolledCourses?.map((c) => (
            <div
              key={c._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {c.title}
                </h3>
                <span className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                  <BookOpen size={14} />
                  {c.lessons?.length || 0} Lessons
                </span>
              </div>

              <Link
                to={`/courses/${c._id}`}
                className="block w-full text-center font-semibold rounded-lg py-3 px-4 transition-all duration-200 bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md"
              >
                Continue Learning
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-medium text-gray-800 dark:text-white">
            You aren't enrolled in any courses yet.
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Explore our course library to start learning.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  )
}