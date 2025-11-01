// import { useEffect, useState } from 'react'
// import api from '../api/api.js' // Assuming this path is correct
// import CourseCard from '../components/CourseCard.jsx' // Assuming this path is correct
// // import { Search, Filter } from 'lucide-react' // Example: Icons add a nice touch

// export default function Landing() {
//   const [courses, setCourses] = useState([])
//   const [search, setSearch] = useState('')
//   const [category, setCategory] = useState('')

//   // --- Content Logic (Unchanged) ---
//   // This effect now correctly passes the search and category state
//   // to the API as query parameters, as your commented-out code intended.
//   useEffect(() => {
//     async function getData() {
//       try {
//         const { data } = await api.get('/courses');
//         // , {
//         //   params: { search, category }
//         // }
//         console.log(data);
//         setCourses(data)
//       } catch (error) {
//         console.error("Failed to fetch courses:", error)
//         setCourses([]) // Set to empty array on error
//       }
//     }
//     getData();
//   },[])
//   //  [search, category])

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

//         <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-8 md:p-12 rounded-2xl shadow-xl mb-12">
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
//             Find Your Next Course
//           </h1>
//           <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
//             Explore our library of expert-led courses. Start learning a new
//             skill today!
//           </p>

//           <div className="flex flex-col md:flex-row items-center gap-4">
//             <div className="relative w-full md:flex-1">
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by keyword (e.g., React, Python...)"
//                 className="w-full rounded-lg border-0 py-3 pr-4 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-300"
//               />
//             </div>
            
//             <div className="relative w-full md:w-auto">
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full md:w-auto rounded-lg border-0 py-3 pr-10 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-300 appearance-none"
//               >
//                 <option value="">All Categories</option>
//                 <option value="Programming">Programming</option>
//                 <option value="Frontend">Frontend</option>
//                 <option value="Backend">Backend</option>
//                 <option value="Data">Data</option>
//                 <option value="General">General</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-gray-800 mb-6">
//           Available Courses
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.length > 0 ? (
//             courses.map((course) => (
//               <CourseCard key={course._id} course={course} />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
//               <h3 className="text-xl font-medium text-gray-800">
//                 No Courses Found
//               </h3>
//               <p className="text-gray-500 mt-2">
//                 Try adjusting your search or filter to find what you're looking for.
//               </p>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   )
// }


import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api.js'
import CourseCard from '../components/CourseCard.jsx'
import { Award, Clock, BookOpen } from 'lucide-react'

// Reusable component for feature cards
function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 rounded-full p-5">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}

export default function Landing() {
  const [featuredCourses, setFeaturedCourses] = useState([])
  const [loading, setLoading] = useState(true) // Added loading state

  useEffect(() => {
    async function getFeaturedCourses() {
      setLoading(true)
      try {
        const { data } = await api.get('/courses?limit=3')
        setFeaturedCourses(data)
      } catch (error) {
        console.error("Failed to fetch featured courses:", error)
      } finally {
        setLoading(false)
      }
    }
    getFeaturedCourses()
  }, [])

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      
      {/* --- Hero Section --- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-800 dark:to-cyan-900 pb-20 pt-24 md:pb-32 md:pt-40"> {/* Enhanced gradient background */}
        
        {/* Abstract Background Shapes/Pattern (Optional) */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin slice">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" className="text-white dark:text-gray-900" />
          </svg>
        </div>
        
        {/* Main Content of Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight"> {/* Stronger text, shadow */}
            Unlock Your<br className="sm:hidden"/> <span className="text-yellow-300 dark:text-yellow-400">Full Potential</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white opacity-90 drop-shadow-md"> {/* White text with shadow */}
            Welcome to Learnify. Master in-demand skills with our expert-led online courses. Start your learning journey today and achieve your goals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-white text-teal-600 px-8 py-3 text-base font-bold shadow-lg transition-all hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Browse All Courses
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent text-white px-8 py-3 text-base font-bold shadow-lg transition-all hover:bg-white hover:text-teal-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Sign Up Now
            </Link>
          </div>
        </div>

        {/* --- Wave Divider --- */}
        <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg 
            viewBox="0 0 1440 100" 
            fill="none" 
            preserveAspectRatio="none" 
            className="w-full h-full"
          >
            <path 
              d="M0 0L480 50L960 0L1440 100L1440 0L0 0Z" 
              fill="currentColor" 
              className="text-gray-50 dark:text-gray-950" 
            /> {/* Matches background of the next section */}
          </svg>
        </div>
      </div>

      {/* --- Features Section --- */}
      <div className="bg-gray-50 dark:bg-gray-950 py-24"> {/* Changed to match hero wave color */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Why Learn with Learnify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Award size={32} />}
              title="Expert Instructors"
              description="Learn from industry professionals who are vetted for their expertise and teaching quality."
            />
            <FeatureCard
              icon={<Clock size={32} />}
              title="Flexible Learning"
              description="Access your courses anytime, anywhere, on any device. Learn at your own pace."
            />
            <FeatureCard
              icon={<BookOpen size={32} />}
              title="Diverse Catalog"
              description="From programming to data science, and more, find the perfect course for your goals."
            />
          </div>
        </div>
      </div>

      {/* --- Featured Courses Section --- */}
      <div className="bg-gray-50 dark:bg-gray-950 py-24"> {/* Changed background for contrast */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Start Your Learning Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore a selection of our most popular and highly-rated courses.
            </p>
          </div>
          
          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading Skeleton
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
                    <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3"></div>
                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-1"></div>
                    <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
                    <div className="h-12 w-full bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
                  </div>
                </div>
              ))
            ) : (
              // Loaded Courses
              featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            )}
            {/* Handle case where loading is false but no courses were fetched */}
            {!loading && featuredCourses.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No featured courses are available at this time.
              </p>
            )}
          </div>
          
          {/* View All Button */}
          <div className="mt-16 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

