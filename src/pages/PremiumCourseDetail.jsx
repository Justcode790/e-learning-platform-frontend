import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api.js'
import LessonPlayer from '../components/LessonPlayer.jsx'
import FeedbackForm from '../components/FeedbackForm.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { PlayCircle, CheckCircle, Lock, ArrowLeft, ArrowRight } from 'lucide-react'

function CourseLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-8 animate-pulse">
      <div className="h-9 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3"></div>
      <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 rounded-lg mb-8"></div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video w-full bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-11 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-11 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
        
        <aside className="lg:col-span-1 space-y-4">
          <div className="h-7 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function PremiumCourseDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const lessons = course?.lessons || []

  useEffect(() => {
    setLoading(true)
    api.get(`/courses/${id}`)
      .then(({ data }) => setCourse(data))
      .catch(err => console.error("Failed to fetch course", err))
      .finally(() => setLoading(false))
  }, [id])

  const canFeedback = useMemo(() => user?.role === 'student' && lessons.length > 0 && current >= lessons.length - 1, [user, lessons, current])

  if (loading) return <CourseLoadingSkeleton />
  if (!course) return <div className="text-center mt-10 text-red-500">Course not found.</div>

  const buttonStyle = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  const primaryButtonStyle = `${buttonStyle} bg-teal-600 text-white hover:bg-teal-700`
  const secondaryButtonStyle = `${buttonStyle} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700`

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {course.title}
        </h1>
        <div className="text-base text-gray-600 dark:text-gray-400">
          Instructor: <span className="font-medium text-teal-600 dark:text-teal-400">{course.instructor?.name}</span>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
            <LessonPlayer url={lessons[current]?.videoUrl} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">{lessons[current]?.title || 'Lesson Title'}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {lessons[current]?.description || 'No description available for this lesson.'}
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              disabled={current === 0} 
              onClick={() => setCurrent((c) => Math.max(0, c - 1))} 
              className={secondaryButtonStyle}
            >
              <ArrowLeft size={16} />
              Prev Lesson
            </button>
            <span className="text-sm font-medium text-gray-500">
              Lesson {current + 1} of {lessons.length}
            </span>
            <button 
              disabled={current >= lessons.length - 1} 
              onClick={() => setCurrent((c) => Math.min(lessons.length - 1, c + 1))} 
              className={primaryButtonStyle}
            >
              Next Lesson
              <ArrowRight size={16} />
            </button>
          </div>
          
          {canFeedback && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Leave Feedback</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
                  You've completed the course! Help us and other students by leaving your feedback.
                </p>
                <FeedbackForm onSubmit={async ({ rating, comment }) => {
                  await api.post(`/courses/${id}/feedback`, { rating, comment })
                  alert('Thanks for your feedback!')
                }} />
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h3 className="text-xl font-bold mb-5">Course Lessons</h3>
            <ul className="space-y-2">
              {lessons.map((ls, i) => (
                <li key={i}>
                  <button 
                    onClick={() => setCurrent(i)} 
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start gap-4 ${
                      i === current 
                      ? 'bg-teal-50 border-teal-500 dark:bg-teal-900/30 dark:border-teal-600' 
                      : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {i === current ? (
                        <PlayCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      ) : (
                        <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className={`font-medium ${
                        i === current 
                        ? 'text-teal-700 dark:text-teal-200' 
                        : 'text-gray-800 dark:text-gray-100'
                      }`}>
                        {ls.title}
                      </span>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {ls.duration || 0} min
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}