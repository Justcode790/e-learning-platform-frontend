import { useEffect, useState } from 'react'
import api from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import DashboardLoadingSkeleton from '../components/skeletons/DashboardLoadingSkeleton.jsx'
import TeacherCourseCard from '../components/cards/TeacherCourseCard.jsx'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  if (!user) return;

  async function getTeacherCourses() {
    setLoading(true);
    try {
      const { data } = await api.get('/courses/my-courses');
      // console.log(data);
      setCourses(data.courses);
    } catch (error) {
      console.error("Failed to fetch teacher courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }

  getTeacherCourses();
}, [user]);

  if (loading) return <DashboardLoadingSkeleton />

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.name}!
        </h1>
        <Link
          to="/create-course"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <Plus size={18} />
          Create New Course
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-5">
        Your Courses
      </h2>
    {console.log(courses)}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <TeacherCourseCard key={c._id} course={c} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-medium text-gray-800 dark:text-white">
            You haven't created any courses yet.
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Get started by creating your first course.
          </p>
          <Link
            to="/create-course"
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            Create Course
          </Link>
        </div>
      )}
    </div>
  )
}