// import { useState } from 'react'
// import api from '../api/api.js'
// import { useNavigate } from 'react-router-dom'

// export default function CreateCourse() {
//   const [form, setForm] = useState({ title: '', description: '', category: 'General', price: 0 })
//   const [lessons, setLessons] = useState([{ title: 'Introduction', videoUrl: '', duration: 5, description: '' }])
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const addLesson = () => setLessons((l) => [...l, { title: '', videoUrl: '', duration: 0, description: '' }])
//   const updateLesson = (i, key, val) => setLessons((l) => l.map((x, idx) => (idx === i ? { ...x, [key]: val } : x)))

//   return (
//     <div className="max-w-2xl">
//       <h1 className="text-2xl font-semibold mb-4">Create Course</h1>
//       {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
//       <form
//         className="space-y-3"
//         onSubmit={async (e) => {
//           e.preventDefault()
//           try {
//             const { data } = await api.post('/courses', form)
//             for (const lesson of lessons) {
//               if (lesson.title) await api.post(`/courses/${data._id}/lessons`, lesson)
//             }
//             navigate(`/courses/${data._id}`)
//           } catch (e) {
//             setError('Failed to create course')
//           }
//         }}
//       >
//         <div>
//           <label className="block text-sm">Title</label>
//           <input className="w-full border rounded px-3 py-2 bg-transparent" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//         </div>
//         <div>
//           <label className="block text-sm">Description</label>
//           <textarea className="w-full border rounded px-3 py-2 bg-transparent" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <label className="block text-sm">Category</label>
//             <input className="w-full border rounded px-3 py-2 bg-transparent" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
//           </div>
//           <div>
//             <label className="block text-sm">Price</label>
//             <input type="number" className="w-full border rounded px-3 py-2 bg-transparent" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
//           </div>
//         </div>

//         <div className="mt-4 space-y-3">
//           <div className="font-semibold">Lessons</div>
//           {lessons.map((ls, i) => (
//             <div key={i} className="border rounded p-3 space-y-2">
//               <div>
//                 <label className="block text-sm">Title</label>
//                 <input className="w-full border rounded px-3 py-2 bg-transparent" value={ls.title} onChange={(e) => updateLesson(i, 'title', e.target.value)} />
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-sm">Video URL</label>
//                   <input className="w-full border rounded px-3 py-2 bg-transparent" value={ls.videoUrl} onChange={(e) => updateLesson(i, 'videoUrl', e.target.value)} />
//                 </div>
//                 <div>
//                   <label className="block text-sm">Duration (min)</label>
//                   <input type="number" className="w-full border rounded px-3 py-2 bg-transparent" value={ls.duration} onChange={(e) => updateLesson(i, 'duration', Number(e.target.value))} />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm">Description</label>
//                 <textarea className="w-full border rounded px-3 py-2 bg-transparent" value={ls.description} onChange={(e) => updateLesson(i, 'description', e.target.value)} />
//               </div>
//             </div>
//           ))}
//           <button type="button" onClick={addLesson} className="px-3 py-2 rounded border">Add Lesson</button>
//         </div>

//         <button className="mt-4 px-3 py-2 rounded bg-blue-600 text-white">Create</button>
//       </form>
//     </div>
//   )
// }


import { useState } from 'react'
import api from '../api/api.js'
import { useNavigate } from 'react-router-dom'
import { Plus, AlertCircle, UploadCloud } from 'lucide-react'

export default function CreateCourse() {
  const [form, setForm] = useState({ title: '', description: '', category: 'General', price: 0 })
  const [lessons, setLessons] = useState([{ title: '', videoFile: null, duration: 5, description: '' }]);
  const [error, setError] = useState('')
  const [thumbnail, setThumbnail] = useState(null);

  const navigate = useNavigate()

  const addLesson = () => setLessons((l) => [...l, { title: '', videoUrl: '', duration: 0, description: '' }])
  const updateLesson = (i, key, val) => setLessons((l) => l.map((x, idx) => (idx === i ? { ...x, [key]: val } : x)))

  // --- Reusable Styles ---
  const inputStyle = "w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
  const labelStyle = "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"

 const handleformSubmit = async (e) => {
  e.preventDefault();
  try {
    // Step 1: Create course
    const { data: course } = await api.post('/courses', form);

    // Step 2: Upload thumbnail (if available)
    if (thumbnail) {
      const thumbData = new FormData();
      thumbData.append('thumbnail', thumbnail);
      await api.post(`/courses/${course._id}/thumbnail`, thumbData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    // Step 3: Upload each lesson with video
    for (const lesson of lessons) {
      if (!lesson.title) continue;
      if (lesson.videoFile) {
        const videoData = new FormData();
        videoData.append('title', lesson.title);
        videoData.append('duration', lesson.duration);
        videoData.append('description', lesson.description);
        videoData.append('video', lesson.videoFile);

        await api.post(`/courses/${course._id}/lessons/upload`, videoData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post(`/courses/${course._id}/lessons`, lesson);
      }
    }

    navigate(`/courses/${course._id}`);
  } catch (e) {
    console.error(e);
    setError('Failed to create course');
  }
};


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create a New Course
      </h1>

      {error && (
        <div className="flex items-start gap-3 rounded-md border border-red-300 bg-red-50 p-4 mb-6 dark:border-red-700 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            {error}
          </p>
        </div>
      )}

      <form
        className="space-y-8"
        onSubmit={handleformSubmit}
      >
        {/* --- Card 1: Course Details --- */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Course Details</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className={labelStyle}>Title</label>
              <input
                id="title"
                type="text"
                className={inputStyle}
                placeholder="e.g., Ultimate React Masterclass"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="thumbnail" className={labelStyle}>Course Thumbnail</label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-900 dark:text-white"
                onChange={(e) => setThumbnail(e.target.files[0])}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className={labelStyle}>Description</label>
              <textarea
                id="description"
                rows="4"
                className={inputStyle}
                placeholder="What will students learn in this course?"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="category" className={labelStyle}>Category</label>
                <input
                  id="category"
                  type="text"
                  className={inputStyle}
                  placeholder="e.g., Programming"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="price" className={labelStyle}>Price ($)</label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  className={inputStyle}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Card 2: Course Lessons --- */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Course Lessons</h2>
            <button
              type="button"
              onClick={addLesson}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <Plus size={16} />
              Add Lesson
            </button>
          </div>

          <div className="space-y-6">
            {lessons.map((ls, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 space-y-4 relative"
              >
                <span className="absolute -top-3 -left-3 flex items-center justify-center w-7 h-7 bg-teal-600 text-white font-bold text-sm rounded-full">
                  {i + 1}
                </span>
                
                <div>
                  <label htmlFor={`ls-title-${i}`} className={labelStyle}>Lesson Title</label>
                  <input
                    id={`ls-title-${i}`}
                    type="text"
                    className={inputStyle}
                    placeholder="e.g., Setting up your environment"
                    value={ls.title}
                    onChange={(e) => updateLesson(i, 'title', e.target.value)}
                    required
                  />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor={`video-${i}`} className={labelStyle}>Upload Video</label>
                    <input
                      id={`video-${i}`}
                      type="file"
                      accept="video/*"
                      className="block w-full text-sm text-gray-900 dark:text-white"
                      onChange={(e) => updateLesson(i, 'videoFile', e.target.files[0])}
                    />
                  </div>

                  <div>
                    <label htmlFor={`ls-duration-${i}`} className={labelStyle}>Duration (min)</label>
                    <input
                      id={`ls-duration-${i}`}
                      type="number"
                      min="0"
                      className={inputStyle}
                      value={ls.duration}
                      onChange={(e) => updateLesson(i, 'duration', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`ls-desc-${i}`} className={labelStyle}>Lesson Description</label>
                  <textarea
                    id={`ls-desc-${i}`}
                    rows="3"
                    className={inputStyle}
                    placeholder="What is this lesson about?"
                    value={ls.description}
                    onChange={(e) => updateLesson(i, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Form Submission --- */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <UploadCloud size={18} />
            Create
          </button>
        </div>
      </form>
    </div>
  )
}