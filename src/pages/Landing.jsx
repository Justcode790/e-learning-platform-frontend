import { useEffect, useState } from 'react'
import api from '../api/api.js' // Assuming this path is correct
import CourseCard from '../components/CourseCard.jsx' // Assuming this path is correct
// import { Search, Filter } from 'lucide-react' // Example: Icons add a nice touch

export default function Landing() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  // --- Content Logic (Unchanged) ---
  // This effect now correctly passes the search and category state
  // to the API as query parameters, as your commented-out code intended.
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await api.get('/courses', {
          params: { search, category }
        })
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        setCourses([]) // Set to empty array on error
      }
    }
    getData();
  }, [search, category])

  // --- Attractive Layout (New JSX) ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* === Hero & Search Section === */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-8 md:p-12 rounded-2xl shadow-xl mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Find Your Next Course
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
            Explore our library of expert-led courses. Start learning a new
            skill today!
          </p>

          {/* Improved Search & Filter Controls */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /> */}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by keyword (e.g., React, Python...)"
                className="w-full rounded-lg border-0 py-3 pr-4 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-300"
              />
            </div>
            
            {/* Category Select */}
            <div className="relative w-full md:w-auto">
              {/* <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /> */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-auto rounded-lg border-0 py-3 pr-10 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-300 appearance-none"
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

        {/* === Course Grid Section === */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Available Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            // Map over courses and render cards
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            // Show a message if no courses are found
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800">
                No Courses Found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}