import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function MyCourses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [progressList, setProgressList] = useState([])
  const [loading, setLoading] = useState(true)
  console.log(user)
  useEffect(() => {
    if (!user?.id) return

    const fetchData = async () => {
      try {
        setLoading(true)

        const [myCoursesRes, studentRes] = await Promise.all([
          api.get('/courses/my-courses'),
          api.get(`/students/${user._id}`)
        ])

        setCourses(myCoursesRes.data?.courses || [])
        setProgressList(studentRes.data?.student?.progress || [])
      } catch (error) {
        console.error('Failed to load my courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?._id])

  const courseIdToProgress = useMemo(() => {
    const map = new Map()
    for (const p of progressList) map.set(String(p.courseId), p.completedLessons || 0)
    return map
  }, [progressList])

  if (loading) {
    return <div className="mx-auto max-w-6xl text-gray-500">Loading...</div>
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-semibold">My Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          You haven't enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const totalLessons = Array.isArray(course.lessons) ? course.lessons.length : 0
            const completed = courseIdToProgress.get(String(course._id)) || 0
            const percent = totalLessons > 0
              ? Math.min(100, Math.round((completed / totalLessons) * 100))
              : 0

            return (
              <div
                key={course._id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                {course.thumbnailUrl && (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="line-clamp-2 text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-500">
                      {course?.instructor?.name || 'Instructor'}
                    </p>
                  </div>
                  <ProgressBar value={percent} />
                  <Link
                    to={`/courses/${course._id}`}
                    className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
