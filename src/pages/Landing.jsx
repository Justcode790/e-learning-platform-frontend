import { useEffect, useState } from 'react'
import api from '../api/api.js'
import CourseCard from '../components/CourseCard.jsx'

export default function Landing() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    async function getData(){
      const res = await api.get('/courses');
      // { params: { search, category } }).then(({ data }) => setCourses(data)).catch(() => setCourses([])
      // console.log(res.data);
      setCourses(res.data)
    }
    getData();

  }, [search, category])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses" className="border rounded px-3 py-2 flex-1 bg-transparent" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2 bg-transparent">
          <option value="">All</option>
          <option value="Programming">Programming</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Data">Data</option>
          <option value="General">General</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  )
}


