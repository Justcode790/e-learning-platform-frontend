import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CourseCard({ course }) {
  const { user } = useAuth()
  const [isPurchased, setIsPurchased] = useState(false)

  useEffect(() => {
    if (user && user.role === 'student' && user.enrolledCourses) {
      const purchased = user.enrolledCourses.some(
        (id) => id.toString() === course._id.toString()
      )
      setIsPurchased(purchased)
    } else {
      setIsPurchased(false)
    }
  }, [user, course])
  
  const showContinueLearning = user && isPurchased
  // console.log(course.thumbnail);
  console.log('Course Data:', course)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700">
      <Link 
        to={showContinueLearning ? `/courses/${course._id}` : `/courses/${course._id}/details`}
        aria-label={`View details for ${course.title}`}
      >
        <img
          className="w-full h-48 object-cover"
          src={course.thumbnailUrl || "https://res.cloudinary.com/debc5aznw/image/upload/v1761926651/React_Foundamental_ersrpd.png"}
          alt={course.title}
        />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <span className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
          {course.category}
        </span>

        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
          {course.description}
        </p>

        <div className="mb-5">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${course.price ?? 0}
          </span>
        </div>

        {showContinueLearning ? (
          <Link
            className="block w-full text-center font-semibold rounded-lg py-3 px-4 transition-all duration-200 bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md"
            to={`/courses/${course._id}`}
          >
            Continue Learning
          </Link>
        ) : (
          <Link
            className="block w-full text-center font-semibold rounded-lg py-3 px-4 transition-all duration-200 bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md"
            to={`/courses/${course._id}/details`}
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  )
}
