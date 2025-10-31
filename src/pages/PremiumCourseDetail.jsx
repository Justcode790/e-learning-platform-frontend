import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api.js'
import LessonPlayer from '../components/LessonPlayer.jsx'
import FeedbackForm from '../components/FeedbackForm.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function PremiumCourseDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [current, setCurrent] = useState(0)
  const lessons = course?.lessons || []

  useEffect(() => {
    api.get(`/courses/${id}`).then(({ data }) => setCourse(data))
  }, [id])

  const canFeedback = useMemo(() => user?.role === 'student' && lessons.length > 0 && current >= lessons.length - 1, [user, lessons, current])

  if (!course) return null

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Instructor: {course.instructor?.name}</div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <LessonPlayer url={lessons[current]?.videoUrl} />
          <div>
            <div className="font-semibold">{lessons[current]?.title}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{lessons[current]?.description}</p>
          </div>
          <div className="flex gap-2">
            <button disabled={current===0} onClick={() => setCurrent((c) => Math.max(0, c-1))} className="px-3 py-2 rounded border disabled:opacity-50">Prev</button>
            <button disabled={current>=lessons.length-1} onClick={() => setCurrent((c) => Math.min(lessons.length-1, c+1))} className="px-3 py-2 rounded border disabled:opacity-50">Next</button>
          </div>
          {canFeedback && (
            <div className="mt-4">
              <div className="font-semibold mb-2">Leave feedback</div>
              <FeedbackForm onSubmit={async ({ rating, comment }) => {
                await api.post(`/courses/${id}/feedback`, { rating, comment })
                alert('Thanks for your feedback!')
              }} />
            </div>
          )}
        </div>
        <aside className="space-y-2">
          <div className="font-semibold">Lessons</div>
          <ul className="space-y-1">
            {lessons.map((ls, i) => (
              <li key={i}>
                <button onClick={() => setCurrent(i)} className={`w-full text-left px-3 py-2 rounded border ${i===current ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>{ls.title}</button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}


