import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/api.js'

export default function CourseCard({ course }) {
  const { user } = useAuth()
  const [isPurchased, setIsPurchased] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const [avgRating, setAvgRating] = useState(null)
  const [reviewCount, setReviewCount] = useState(0)



  

  useEffect(() => {
    if (user?.role === 'student' && Array.isArray(user.enrolledCourses)) {
      setIsPurchased(user.enrolledCourses.some(id => id.toString() === course._id.toString()))
    } else {
      setIsPurchased(false)
    }
  }, [user, course])

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        if (!user || user.role !== 'student') return
        const res = await api.get(`/students/${user.id}/wishlist`)
        const list = res.data?.wishlist || []
        setInWishlist(list.some(c => c._id === course._id))
      } catch (e) {
        console.error('Wishlist fetch failed:', e)
      }
    }
    checkWishlist()
  }, [user?.id, course._id])

  useEffect(() => {
    const loadRating = async () => {
      try {
        const { data } = await api.get(`/courses/${course._id}`)
        const feedback = data?.feedback || []
        if (feedback.length > 0) {
          const sum = feedback.reduce((s, f) => s + (f.rating || 0), 0)
          setAvgRating(Math.round((sum / feedback.length) * 10) / 10)
          setReviewCount(feedback.length)
        } else {
          setAvgRating(null)
          setReviewCount(0)
        }
      } catch (err) {
        console.error('Failed to load ratings:', err)
      }
    }
    loadRating()
  }, [course._id])

  const toggleWishlist = async () => {
    if (!user || user.role !== 'student') return
    try {
      if (inWishlist) {
        await api.delete(`/students/${user.id}/wishlist/${course._id}`)
        setInWishlist(false)
      } else {
        await api.post(`/students/${user.id}/wishlist/${course._id}`)
        setInWishlist(true)
      }
    } catch (e) {
      console.error('Wishlist update failed', e)
    }
  }

  const showContinueLearning = user && isPurchased

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

        {avgRating !== null && (
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2 text-yellow-400">★</span>
            <span className="font-medium">{avgRating}</span>
            <span className="ml-2">({reviewCount} reviews)</span>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
          {course.description}
        </p>

        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${course.price ?? 0}
          </span>
          {user && user.role === 'student' && (
            <button
              type="button"
              onClick={toggleWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition ${inWishlist
                ? 'border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              {inWishlist ? '♥ Wishlisted' : '♡ Add to Wishlist'}
            </button>
          )}
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
