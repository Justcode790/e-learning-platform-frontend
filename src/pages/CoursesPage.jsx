import { useEffect, useState } from 'react'
import api from '../api/api.js'
import CourseCard from '../components/CourseCard.jsx'
import { Search, Filter } from 'lucide-react'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        const { data } = await api.get('/courses', {
          params: { search, category }
        })
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    getData();
  }, [search, category])

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* --- Search & Filter Header --- */}
        <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900 dark:text-white">
            Find Your Next Course
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Explore our full library of expert-led courses. Use the filters below to find the perfect one for you.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by keyword (e.g., React, Python...)"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 py-3 pr-4 pl-12 text-gray-900 dark:text-white bg-transparent shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500"
              />
            </div>
            
            <div className="relative w-full md:w-auto">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-64 rounded-lg border border-gray-300 dark:border-gray-700 py-3 pr-10 pl-12 text-gray-900 dark:text-white bg-transparent shadow-sm focus:ring-2 focus:ring-inset focus:ring-teal-500 appearance-none"
              >
                <option value="">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Data">Data</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Courses Grid --- */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Available Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-gray-500">Loading courses...</p>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">
                No Courses Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
