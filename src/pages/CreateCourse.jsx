import { useState } from 'react'
import api from '../api/api.js'
import { useNavigate } from 'react-router-dom'

export default function CreateCourse() {
  const [form, setForm] = useState({ title: '', description: '', category: 'General', price: 0 })
  const [lessons, setLessons] = useState([{ title: 'Introduction', videoUrl: '', duration: 5, description: '' }])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const addLesson = () => setLessons((l) => [...l, { title: '', videoUrl: '', duration: 0, description: '' }])
  const updateLesson = (i, key, val) => setLessons((l) => l.map((x, idx) => (idx === i ? { ...x, [key]: val } : x)))

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Create Course</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            const { data } = await api.post('/courses', form)
            for (const lesson of lessons) {
              if (lesson.title) await api.post(`/courses/${data._id}/lessons`, lesson)
            }
            navigate(`/courses/${data._id}`)
          } catch (e) {
            setError('Failed to create course')
          }
        }}
      >
        <div>
          <label className="block text-sm">Title</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <textarea className="w-full border rounded px-3 py-2 bg-transparent" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm">Category</label>
            <input className="w-full border rounded px-3 py-2 bg-transparent" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm">Price</label>
            <input type="number" className="w-full border rounded px-3 py-2 bg-transparent" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="font-semibold">Lessons</div>
          {lessons.map((ls, i) => (
            <div key={i} className="border rounded p-3 space-y-2">
              <div>
                <label className="block text-sm">Title</label>
                <input className="w-full border rounded px-3 py-2 bg-transparent" value={ls.title} onChange={(e) => updateLesson(i, 'title', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm">Video URL</label>
                  <input className="w-full border rounded px-3 py-2 bg-transparent" value={ls.videoUrl} onChange={(e) => updateLesson(i, 'videoUrl', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm">Duration (min)</label>
                  <input type="number" className="w-full border rounded px-3 py-2 bg-transparent" value={ls.duration} onChange={(e) => updateLesson(i, 'duration', Number(e.target.value))} />
                </div>
              </div>
              <div>
                <label className="block text-sm">Description</label>
                <textarea className="w-full border rounded px-3 py-2 bg-transparent" value={ls.description} onChange={(e) => updateLesson(i, 'description', e.target.value)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={addLesson} className="px-3 py-2 rounded border">Add Lesson</button>
        </div>

        <button className="mt-4 px-3 py-2 rounded bg-blue-600 text-white">Create</button>
      </form>
    </div>
  )
}


